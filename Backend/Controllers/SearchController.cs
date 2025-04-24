using Backend.API;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] string query, CancellationToken cancellationToken)
    {
        var albumsTask = ApiClient.GetAlbumsAsync(query, cancellationToken);
        var artistsTask = ApiClient.GetArtistsAsync(query, cancellationToken);

        await Task.WhenAll(albumsTask, artistsTask);
        
        var albumsResult = await albumsTask;
        var artistsResult = await artistsTask;

        return Ok(new
        {
            albums = albumsResult?.Results.AlbumMatches.Album,
            artists = artistsResult?.Results.ArtistMatches.Artists,
        });
    }
}
