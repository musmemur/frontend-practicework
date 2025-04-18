using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReleaseController(AppDbContext dbContext, JwtService jwtService) : ControllerBase
{
    public async Task<IActionResult> CreateRelease([FromBody] CreateReleaseRequest request, CancellationToken ct)
    {
        var release = new Release(request.Title, request.Artist);

        dbContext.Releases.Add(release);
        await dbContext.SaveChangesAsync(ct);

        return Ok();
    }
    
    public async Task<IActionResult> GetReleaseId([FromBody] CreateReleaseRequest request, CancellationToken ct)
    {
        var release = new Release(request.Title, request.Artist);

        dbContext.Releases.Add(release);
        await dbContext.SaveChangesAsync(ct);

        return Ok();
    }
}