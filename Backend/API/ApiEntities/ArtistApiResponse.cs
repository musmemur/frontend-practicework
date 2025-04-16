using System.Text.Json.Serialization;

namespace Backend.API.ApiEntities.ArtistApiResponse;

public class ArtistApiResponse
{
    [JsonPropertyName("results")]
    public Results Results { get; set; }
}

public class Results
{
    [JsonPropertyName("opensearch:Query")]
    public OpenSearchQuery OpenSearchQuery { get; set; }

    [JsonPropertyName("opensearch:totalResults")]
    public string TotalResults { get; set; }

    [JsonPropertyName("opensearch:startIndex")]
    public string StartIndex { get; set; }

    [JsonPropertyName("opensearch:itemsPerPage")]
    public string ItemsPerPage { get; set; }

    [JsonPropertyName("artistmatches")]
    public ArtistMatches ArtistMatches { get; set; }

    [JsonPropertyName("@attr")]
    public Attr Attr { get; set; }
}

public class OpenSearchQuery
{
    [JsonPropertyName("#text")]
    public string Text { get; set; }

    [JsonPropertyName("role")]
    public string Role { get; set; }

    [JsonPropertyName("searchTerms")]
    public string SearchTerms { get; set; }

    [JsonPropertyName("startPage")]
    public string StartPage { get; set; }
}

public class ArtistMatches
{
    [JsonPropertyName("artist")]
    public List<Artist> Artists { get; set; }
}

public class Artist
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("listeners")]
    public string Listeners { get; set; }

    [JsonPropertyName("mbid")]
    public string Mbid { get; set; }

    [JsonPropertyName("url")]
    public string Url { get; set; }

    [JsonPropertyName("streamable")]
    public string Streamable { get; set; }

    [JsonPropertyName("image")]
    public List<Image> Images { get; set; }
}

public class Image
{
    [JsonPropertyName("#text")]
    public string Url { get; set; }

    [JsonPropertyName("size")]
    public string Size { get; set; }
}

public class Attr
{
    [JsonPropertyName("for")]
    public string For { get; set; }
}