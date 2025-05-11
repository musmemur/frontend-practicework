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
        var albumsResult = await ApiClient.GetAlbumsAsync(query, cancellationToken);
        return Ok(new { albums = albumsResult?.Results.AlbumMatches.Album, });
    }
}
