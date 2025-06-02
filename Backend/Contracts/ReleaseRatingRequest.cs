namespace Backend.Contracts;

public record ReleaseRatingRequest(Guid ReleaseId, uint Rating);