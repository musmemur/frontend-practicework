using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReleaseController(AppDbContext dbContext, ReleaseService releaseService) : ControllerBase
{
    [HttpPost("get-id")]
    public async Task<IActionResult> GetReleaseId([FromBody] ReleaseRequest request, CancellationToken ct)
    {
        var release = await releaseService.GetOrCreateReleaseAsync(request, ct);

        return Ok(new { release.Id, release.Title, release.Artist, release.ReleaseType, release.ReleasePhoto });
    }
}
