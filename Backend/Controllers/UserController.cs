using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Contracts;
using Backend.Dtos;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(AppDbContext dbContext, JwtService jwtService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] CreateUserRequest request, 
        CancellationToken ct)
    {
        if (await dbContext.Users.AnyAsync(u => u.Username == request.Username, ct))
        {
            return BadRequest("Пользователь с таким логином уже существует");
        }

        if (request.UserPhoto?.Data is not null)
        {
            try
            {
                var base64Data = request.UserPhoto.Data.Split(',')[1];
                var mimeType = request.UserPhoto.Data.Split(';')[0].Split(':')[1];

                var imageBytes = Convert.FromBase64String(base64Data);

                var photoPath = await ImageSaver.SaveImageToS3(imageBytes, mimeType, "soundtrackerphotos");
                request.UserPhoto.FileName = photoPath;
                request.UserPhoto.Data = null;
            }
            catch (FormatException ex)
            {
                return BadRequest($"Некорректные base64 данные. Ошибка: {ex.Message}");
            }
        }
        
        var user = new User(
            request.Username, 
            PasswordHasher.Hash(request.Password), 
            request.UserPhoto?.FileName);

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(ct); 

        var token = await jwtService.GenerateJwtTokenAsync(user.Id, ct);
    
        return Ok(new AuthResult(token, user.Id, user.Username, user.UserPhoto));
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var userInfo = await dbContext.Users
            .Where(u => u.Username == request.Username)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
        
        if (userInfo == null)
        {
            return Unauthorized("Пользователя с таким логином не существует");
        }

        if (!PasswordHasher.Validate(userInfo.Password, request.Password))
        {
            return Unauthorized("Неверный пароль");
        }

        var token = await jwtService.GenerateJwtTokenAsync(userInfo.Id, ct);
        return Ok( new AuthResult(token, userInfo.Id, userInfo.Username, userInfo.UserPhoto));
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me(CancellationToken ct)
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                     ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var guid = Guid.Parse(userId);

        var user = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == guid, ct);

        if (user == null)
            return Unauthorized(new { message = "Пользователь не найден" });

        var token = await jwtService.GenerateJwtTokenAsync(user.Id, ct);

        return Ok(new AuthResult(token, user.Id, user.Username, user.UserPhoto));
    }
    
    [HttpGet("get-user-by-id")]
    public async Task<User?> GetUserById(Guid userId, CancellationToken cancellationToken = default)
    {
        var userInfo = await dbContext.Users
            .Where(u => u.Id == userId)
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);
        
        return userInfo;
    }
    
    [HttpGet("get-full-user-info-by-id")]
    public async Task<IActionResult> GetFullUserInfoById(Guid userId, CancellationToken cancellationToken = default)
    {
        var userInfo = await dbContext.Users
            .Include(r => r.Ratings)
            .Include(r => r.SavedReleases)
            .Where(r => r.Id == userId)
            .Select(r => new FullUserInfoDto
            {
                Id = r.Id,
                Username = r.Username,
                UserPhoto = r.UserPhoto,
                Ratings = r.Ratings.Select(rt => new RatingForUserDto
                {
                    ReleaseId = rt.ReleaseId,
                    Rating = rt.Rating
                }).ToList(),
                SavedReleases = r.SavedReleases.Select(sr => new SavedReleasesForUserDto
                {
                    ReleaseId = sr.ReleaseId,
                }).ToList()
            })
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (userInfo == null)
            return NotFound("Пользователь не найден");

        return Ok(userInfo );
    }
}
