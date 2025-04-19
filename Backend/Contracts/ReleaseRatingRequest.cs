namespace Backend.Contracts;

public record ReleaseRatingRequest(string Title, string Artist, string ReleaseType, uint Rating);