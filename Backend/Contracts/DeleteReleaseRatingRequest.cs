namespace Backend.Contracts;

public record DeleteReleaseRatingRequest(Guid UserId, Guid ReleaseId);