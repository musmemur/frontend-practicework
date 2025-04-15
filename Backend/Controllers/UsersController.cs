using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly AppDbContext _dbContext;
    public UsersController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest request, CancellationToken ct)
    {
        var user = new User(request.Username, request.Password, request.UserPhoto);
        
        //дописать валидацию здесь
        
        await _dbContext.Users.AddAsync(user, ct);
        await _dbContext.SaveChangesAsync(ct);
        
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok();
    }
}