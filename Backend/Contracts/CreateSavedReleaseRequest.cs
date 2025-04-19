namespace Backend.Contracts;

public record CreateSavedReleaseRequest(Guid UserId, ReleaseRequest Release);
