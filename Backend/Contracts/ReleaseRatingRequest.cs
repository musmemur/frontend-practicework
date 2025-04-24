namespace Backend.Contracts;

public record ReleaseRatingRequest(string Title, string Artist, uint Rating);