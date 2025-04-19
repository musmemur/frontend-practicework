namespace Backend.Contracts;

public record ReviewRequest(string Title, string Artist, string ReleaseType, string ReviewText);