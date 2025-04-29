using Backend.Contracts;
using Backend.Entities;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewController(AppDbContext dbContext, ReleaseService releaseService, UserService userService) : ControllerBase
{
    // [HttpPost("review")]
    // [Authorize]
    // public async Task<IActionResult> CreateOrUpdateReview([FromBody] ReviewRequest request, CancellationToken ct)
    // {
    //     var release = await releaseService.GetOrCreateReleaseAsync(
    //         new ReleaseRequest(request.Title, request.Artist),
    //         ct);
    //
    //     var userId = userService.GetUserId();
    //     if (userId == null)
    //         return Unauthorized(new { message = "Пользователь не авторизован" });
    //
    //     var existing = await dbContext.Reviews
    //         .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == release.Id, ct);
    //
    //     if (existing != null)
    //     {
    //         existing.ReviewText = request.ReviewText;
    //         dbContext.Reviews.Update(existing);
    //     }
    //     else
    //     {
    //         var review = new Review(userId.Value, release.Id, request.ReviewText);
    //         dbContext.Reviews.Add(review);
    //     }
    //
    //     await dbContext.SaveChangesAsync(ct);
    //     return Ok(new { message = "Рецензия сохранена или обновлена." });
    // }

    [HttpGet("get/{releaseId:guid}")]
    [Authorize]
    public async Task<IActionResult> GetUserReview(Guid releaseId, CancellationToken ct)
    {
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var review = await dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == releaseId, ct);

        if (review == null)
            return NotFound(new { message = "Рецензия не найдена." });

        return Ok(new { review.ReviewText });
    }

    [HttpDelete("delete/{releaseId:guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteReview(Guid releaseId, CancellationToken ct)
    {
        var userId = userService.GetUserId();
        if (userId == null)
            return Unauthorized(new { message = "Пользователь не авторизован" });

        var review = await dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == releaseId, ct);

        if (review == null)
            return NotFound(new { message = "Рецензия не найдена." });

        dbContext.Reviews.Remove(review);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { message = "Рецензия удалена." });
    }
}
