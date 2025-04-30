namespace Backend.Contracts;

public record GetReleaseRatingRequest(Guid UserId, Guid ReleaseId);