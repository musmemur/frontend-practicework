using Backend.Contracts;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class ReleaseService
{
    private readonly AppDbContext _dbContext;

    public ReleaseService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Release> GetOrCreateReleaseAsync(ReleaseRequest request, CancellationToken ct)
    {
        var release = await _dbContext.Releases
            .FirstOrDefaultAsync(r =>
                r.Title == request.Title &&
                r.Artist == request.Artist, ct);

        if (release == null)
        {
            string? releasePhoto = null;
            release = new Release(request.Title, request.Artist, releasePhoto);
            _dbContext.Releases.Add(release);
            await _dbContext.SaveChangesAsync(ct);
        }

        return release;
    }
}
