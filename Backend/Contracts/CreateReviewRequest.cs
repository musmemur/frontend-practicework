namespace Backend.Contracts;

public record CreateReviewRequest(Guid ReleaseId, string ReviewText);