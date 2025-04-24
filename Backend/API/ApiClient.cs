using System.Text.Json;
using Backend.API.ApiEntities.AlbumApiResponse;
using Backend.API.ApiEntities.ArtistApiResponse;

namespace Backend.API;

public static class ApiClient
{
    private static readonly HttpClient HttpClient = new();

    public static async Task<AlbumApiResponse?> GetAlbumsAsync(string albumTitle, CancellationToken cancellationToken)
    {
        var requestUrl =
            $"https://ws.audioscrobbler.com/2.0/?method=album.search&album={Uri.EscapeDataString(albumTitle)}&api_key=eec9f36487afa21d194dd8421f4d5390&format=json";

        var result = await HttpClient.GetFromJsonAsync<AlbumApiResponse>(requestUrl,
            new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            }, cancellationToken: cancellationToken);

        return result;
    }
    
    public static async Task<ArtistApiResponse?> GetArtistsAsync(string artistName, CancellationToken cancellationToken)
    {
        var requestUrl =
            $"https://ws.audioscrobbler.com/2.0/?method=artist.search&artist={Uri.EscapeDataString(artistName)}&api_key=eec9f36487afa21d194dd8421f4d5390&format=json";

        var result = await HttpClient.GetFromJsonAsync<ArtistApiResponse>(requestUrl,
            new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            }, cancellationToken: cancellationToken);

        return result;
    }
}