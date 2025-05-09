using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewController(AppDbContext dbContext) : ControllerBase
{
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateOrUpdateReview([FromBody] CreateReviewRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .Where(u => u.Id == request.ReleaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
    
        var userId = request.UserId;

        var existing = await dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && release != null && r.ReleaseId == release.Id, ct);
    
        if (existing != null)
        {
            existing.ReviewText = request.ReviewText;
            dbContext.Reviews.Update(existing);
        }
        else
        {
            if (release != null)
            {
                var review = new Review(userId, release.Id, request.ReviewText);
                dbContext.Reviews.Add(review);
            }
        }
    
        await dbContext.SaveChangesAsync(ct);
        return Ok(new { message = "Рецензия сохранена или обновлена." });
    }

    [HttpPost("get")]
    [Authorize]
    public async Task<IActionResult> GetUserReview([FromBody]GetReviewRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .Where(u => u.Id == request.ReleaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
    
        if (release == null)
        {
            return NotFound("Release not found");
        }

        var userId = request.UserId;

        var review = await dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == request.ReleaseId, ct);

        return Ok(review == null ? null : new { review.ReviewText });
    }

    [HttpPost("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteReview([FromBody]DeleteReviewRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .Where(u => u.Id == request.ReleaseId)
            .AsNoTracking()
            .FirstOrDefaultAsync(ct);
    
        if (release == null)
        {
            return NotFound("Release not found");
        }

        var userId = request.UserId;

        var review = await dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ReleaseId == request.ReleaseId, ct);

        if (review == null)
            return NotFound(new { message = "Рецензия не найдена." });

        dbContext.Reviews.Remove(review);
        await dbContext.SaveChangesAsync(ct);

        return Ok(new { message = "Рецензия удалена." });
    }
}
