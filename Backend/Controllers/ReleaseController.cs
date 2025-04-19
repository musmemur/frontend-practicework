using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReleaseController(AppDbContext dbContext, JwtService jwtService) : ControllerBase
{
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateRelease([FromBody] CreateReleaseRequest request, CancellationToken ct)
    {
        var existing = await dbContext.Releases
            .FirstOrDefaultAsync(r => 
                r.Title == request.Title && 
                r.Artist == request.Artist && 
                r.ReleaseType == request.ReleaseType, ct);

        if (existing != null)
        {
            return Conflict("Такой релиз уже существует.");
        }

        var release = new Release(request.Title, request.Artist, request.ReleaseType, request.ReleasePhoto);

        dbContext.Releases.Add(release);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { release.Id });
    }

    [HttpPost("get-id")]
    public async Task<IActionResult> GetReleaseId([FromBody] CreateReleaseRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .FirstOrDefaultAsync(r => r.Title == request.Title && r.Artist == request.Artist, ct);

        if (release == null)
        {
            release = new Release(request.Title, request.Artist, request.ReleaseType, request.ReleasePhoto);
            dbContext.Releases.Add(release);
            await dbContext.SaveChangesAsync(ct);
        }

        return Ok(new { release.Id, release.Title, release.Artist, release.ReleaseType, release.ReleasePhoto });
    }

}
