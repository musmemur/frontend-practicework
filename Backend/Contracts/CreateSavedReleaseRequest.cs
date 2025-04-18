namespace Backend.Contracts;

public record CreateSavedReleaseRequest(Guid UserId, Guid ReleaseId);
