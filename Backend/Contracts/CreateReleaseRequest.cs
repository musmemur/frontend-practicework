namespace Backend.Contracts;

public record CreateReleaseRequest(string Title, string Artist, string ReleaseType, string? ReleasePhoto);
