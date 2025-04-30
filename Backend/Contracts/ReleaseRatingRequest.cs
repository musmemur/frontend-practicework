namespace Backend.Contracts;

public record ReleaseRatingRequest(Guid UserId, Guid ReleaseId, uint Rating);