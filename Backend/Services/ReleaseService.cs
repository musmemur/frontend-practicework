using Backend.Contracts;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class ReleaseService(AppDbContext dbContext)
{
    public async Task<Release> GetOrCreateReleaseAsync(ReleaseWithPhotoRequest request, CancellationToken ct)
    {
        var release = await dbContext.Releases
            .FirstOrDefaultAsync(r =>
                r.Title == request.Title &&
                r.Artist == request.Artist, ct);

        if (release != null) return release;
        release = new Release(request.Title, request.Artist, request.ReleasePhoto);
        dbContext.Releases.Add(release);
        await dbContext.SaveChangesAsync(ct);

        return release;
    }
}
