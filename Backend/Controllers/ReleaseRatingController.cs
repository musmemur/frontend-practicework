using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReleaseRatingController(AppDbContext dbContext, ReleaseService releaseService, UserService userService) : ControllerBase
{
    // [HttpPost("rate")]
    // [Authorize]
    // public async Task<IActionResult> RateRelease([FromBody] ReleaseRatingRequest request, CancellationToken ct)
    // {
    //     var release = await releaseService.GetOrCreateReleaseAsync(
    //         new ReleaseRequest(request.Title, request.Artist),
    //         ct);
    //
    //     var userId = userService.GetUserId();
    //     if (userId == null)
    //         return Unauthorized(new { message = "Пользователь не авторизован" });
    //
    //     var existing = await dbContext.ReleaseRatings
    //         .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == release.Id, ct);
    //
    //     if (existing != null)
    //     {
    //         existing.Rating = request.Rating;
    //         dbContext.ReleaseRatings.Update(existing);
    //     }
    //     else
    //     {
    //         var rating = new ReleaseRating(userId.Value, release.Id, request.Rating);
    //         dbContext.ReleaseRatings.Add(rating);
    //     }
    //
    //     await dbContext.SaveChangesAsync(ct);
    //     return Ok(new { message = "Оценка сохранена или обновлена." });
    // }

    [HttpDelete("delete/{releaseId:guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteRating(Guid releaseId, CancellationToken ct)
    {
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var rating = await dbContext.ReleaseRatings
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == releaseId, ct);

        if (rating == null)
            return NotFound(new { message = "Оценка не найдена." });

        dbContext.ReleaseRatings.Remove(rating);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { message = "Оценка удалена." });
    }

    [HttpGet("get/{releaseId:guid}")]
    [Authorize]
    public async Task<IActionResult> GetUserRating(Guid releaseId, CancellationToken ct)
    {
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var rating = await dbContext.ReleaseRatings
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == releaseId, ct);

        if (rating == null)
            return NotFound(new { message = "Оценка не найдена." });

        return Ok(new { rating.Rating });
    }
}
