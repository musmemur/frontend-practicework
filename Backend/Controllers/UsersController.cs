using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly JwtService _jwtService;

    public UsersController(AppDbContext dbContext, JwtService jwtService)
    {
        _dbContext = dbContext;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserRequest request, CancellationToken ct)
    {
        if (await _dbContext.Users.AnyAsync(u => u.Username == request.Username, ct))
        {
            return BadRequest("Пользователь уже существует.");
        }

        var user = new User(request.Username, PasswordHasher.Hash(request.Password), request.UserPhoto);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.Username, ct);
        if (user == null || !PasswordHasher.Validate(user.Password, request.Password))
        {
            return Unauthorized("Неверный логин или пароль.");
        }

        var token = _jwtService.GenerateJwtToken(user);
        return Ok(new { token });
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                     ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized(new { message = "User ID not found in token" });

        return Ok(new { userId });
    }

}
