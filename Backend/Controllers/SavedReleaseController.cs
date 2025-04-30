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
    public async Task<IActionResult> CreateSavedRelease([FromBody] SavedReleaseRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .Where(u => u.Id == request.ReleaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
    
        var userId = request.UserId;
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });
    
        var existing = await dbContext.SavedReleases
            .FirstOrDefaultAsync(r => r.UserId == userId && release != null && r.ReleaseId == release.Id, ct);
    
        if (existing != null)
        {
            return Conflict("Релиз уже сохранён пользователем.");
        }
    
        var savedRelease = new SavedRelease(userId.Value, release.Id);
    
        dbContext.SavedReleases.Add(savedRelease);
        await dbContext.SaveChangesAsync(ct);
    
        return Ok(new { savedRelease.Id });
    }
    
    [HttpPost("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteSavedRelease([FromBody] SavedReleaseRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .Where(u => u.Id == request.ReleaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
        
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var savedRelease = await dbContext.SavedReleases
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == release.Id, ct);

        if (savedRelease == null)
        {
            return NotFound(new { message = "Сохранённый релиз не найден." });
        }

        dbContext.SavedReleases.Remove(savedRelease);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { message = "Сохранённый релиз удалён." });
    }
    
    [HttpPost("check-saved-release-by-user")]
    [Authorize]
    public async Task<bool> CheckSavedReleaseByUser([FromBody] SavedReleaseRequest request, CancellationToken ct)
    {
        var userId = request.UserId;

        var existing = await dbContext.SavedReleases
            .FirstOrDefaultAsync(
                r => r.UserId == userId && r.ReleaseId == request.ReleaseId, 
                ct);

        return existing != null;
    }
}