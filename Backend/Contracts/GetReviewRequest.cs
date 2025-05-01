namespace Backend.Contracts;

public record GetReviewRequest(Guid UserId, Guid ReleaseId);