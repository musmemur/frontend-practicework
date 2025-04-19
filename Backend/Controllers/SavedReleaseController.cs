using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SavedReleaseController(AppDbContext dbContext, ReleaseService releaseService, UserService userService) : ControllerBase
{
    [HttpPost("save")]
    [Authorize]
    public async Task<IActionResult> CreateSavedRelease([FromBody] ReleaseRequest request, CancellationToken ct)
    {
        var release = await releaseService.GetOrCreateReleaseAsync(
            new ReleaseRequest(
                request.Title,
                request.Artist,
                request.ReleaseType), ct);

        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var existing = await dbContext.SavedReleases
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == release.Id, ct);

        if (existing != null)
        {
            return Conflict("Релиз уже сохранён пользователем.");
        }

        var savedRelease = new SavedRelease(userId.Value, release.Id);

        dbContext.SavedReleases.Add(savedRelease);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { savedRelease.Id });
    }
    
    [HttpDelete("delete/{releaseId:guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteSavedRelease(Guid releaseId, CancellationToken ct)
    {
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var savedRelease = await dbContext.SavedReleases
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == releaseId, ct);

        if (savedRelease == null)
        {
            return NotFound(new { message = "Сохранённый релиз не найден." });
        }

        dbContext.SavedReleases.Remove(savedRelease);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { message = "Сохранённый релиз удалён." });
    }

}