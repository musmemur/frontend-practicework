using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReleaseController(AppDbContext dbContext, ReleaseService releaseService) : ControllerBase
{
    [HttpPost("get-release")]
    public async Task<IActionResult> GetRelease([FromBody] ReleaseWithPhotoRequest request, CancellationToken ct)
    {
        var release = await releaseService.GetOrCreateReleaseAsync(request, ct);

        return Ok(new { release.Id, release.Title, release.Artist, release.ReleasePhoto });
    }
    
        
    [HttpGet("get-release-by-id/{releaseId}")]
    public async Task<Release?> GetReleaseById(Guid releaseId, CancellationToken cancellationToken = default)
    {
        var releaseInfo = await dbContext.Releases
            .Where(u => u.Id == releaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);
        
        return releaseInfo;
    }
}
