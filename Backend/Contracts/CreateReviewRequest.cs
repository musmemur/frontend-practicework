namespace Backend.Contracts;

public record CreateReviewRequest(Guid UserId, Guid ReleaseId, string ReviewText);