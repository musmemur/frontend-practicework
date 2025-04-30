namespace Backend.Contracts;

public record SavedReleaseRequest(Guid? UserId, Guid ReleaseId);