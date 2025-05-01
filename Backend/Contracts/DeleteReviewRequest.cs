namespace Backend.Contracts;

public record DeleteReviewRequest(Guid UserId, Guid ReleaseId);