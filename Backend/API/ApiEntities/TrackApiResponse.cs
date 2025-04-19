using System.Text.Json.Serialization;

namespace Backend.API.ApiEntities.TrackApIResponse;

public class TrackApiResponse
{
    public Results Results { get; set; } = null!;
}

public class Results
{
    [JsonPropertyName("opensearch:Query")]
    public OpenSearchQuery OpenSearchQuery { get; set; } = null!;

    [JsonPropertyName("opensearch:totalResults")]
    public string TotalResults { get; set; } = null!;

    [JsonPropertyName("opensearch:startIndex")]
    public string StartIndex { get; set; } = null!;

    [JsonPropertyName("opensearch:itemsPerPage")]
    public string ItemsPerPage { get; set; } = null!;

    [JsonPropertyName("trackmatches")]
    public TrackMatches TrackMatches { get; set; } = null!;
}

public class OpenSearchQuery
{
    [JsonPropertyName("#text")]
    public string Text { get; set; } = null!;

    public string Role { get; set; } = null!;
    public string StartPage { get; set; } = null!;
}

public class TrackMatches
{
    [JsonPropertyName("track")]
    public List<Track> Tracks { get; set; } = new();
}

public class Track
{
    public string Name { get; set; } = null!;
    public string Artist { get; set; } = null!;
    public string Url { get; set; } = null!;
    public string Streamable { get; set; } = null!;
    public string Listeners { get; set; } = null!;
    public string Mbid { get; set; } = null!;

    [JsonPropertyName("image")]
    public List<Image> Images { get; set; } = new();
}

public class Image
{
    [JsonPropertyName("#text")]
    public string Url { get; set; } = null!;

    public string Size { get; set; } = null!;
}
