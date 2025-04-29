namespace Backend.Contracts;

public record ReleaseWithPhotoRequest(string Title, string Artist, string? ReleasePhoto);