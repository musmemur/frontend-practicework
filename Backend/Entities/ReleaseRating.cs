namespace Backend.Entities;

public class ReleaseRating
{
    public ReleaseRating(Guid userId, Guid releaseId, uint rating)
    {
        UserId = userId;
        ReleaseId = releaseId;
        Rating = rating;
    }

    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ReleaseId { get; set; }
    public uint Rating { get; set; }

    public User User { get; set; }
    public Release Release { get; set; }
}