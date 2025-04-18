using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SavedReleaseController(AppDbContext dbContext, JwtService jwtService) : ControllerBase
{
    public async Task<IActionResult> CreateSavedRelease([FromBody] CreateSavedReleaseRequest request, CancellationToken ct)
    {
        var savedRelease = new SavedRelease(request.UserId, request.ReleaseId);

        dbContext.SavedReleases.Add(savedRelease);
        await dbContext.SaveChangesAsync(ct);

        return Ok();
    }
}