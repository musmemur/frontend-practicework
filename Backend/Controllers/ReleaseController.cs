using Backend.Contracts;
using Backend.Dtos;
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
    
        
    [HttpGet("get-release-by-id/{releaseId:guid}")]
    public async Task<ActionResult<ReleaseDto>> GetReleaseById(Guid releaseId, CancellationToken cancellationToken = default)
    {
        var releaseInfo = await dbContext.Releases
            .Include(r => r.Ratings)
            .Include(r => r.Reviews)
            .Include(r => r.SavedByUsers)
            .Where(r => r.Id == releaseId)
            .Select(r => new ReleaseDto
            {
                Id = r.Id,
                Title = r.Title,
                Artist = r.Artist,
                ReleasePhoto = r.ReleasePhoto,
                Ratings = r.Ratings.Select(rt => new RatingDto
                {
                    Rating = rt.Rating
                }).ToList(),
                Reviews = r.Reviews.Select(rv => new ReviewDto
                {
                    UserId = rv.UserId,
                    ReviewText = rv.ReviewText
                }).ToList()
            })
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (releaseInfo == null)
            return NotFound("Релиз не найден");

        return releaseInfo;
    }
}
