namespace Backend.Entities;

public class SavedRelease
{
    public SavedRelease(Guid userId, Guid releaseId)
    {
        UserId = userId;
        ReleaseId = releaseId;
    }

    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ReleaseId { get; set; }

    public User User { get; set; }
    public Release Release { get; set; }
}