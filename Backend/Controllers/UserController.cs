using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

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
            return BadRequest("Пользователь уже существует.");
        }

        var user = new User(
            request.Username, 
            PasswordHasher.Hash(request.Password), 
            request.UserPhoto);

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
        
        if (userInfo == null || !PasswordHasher.Validate(userInfo.Password, request.Password))
        {
            return Unauthorized("Неверный логин или пароль.");
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
}
