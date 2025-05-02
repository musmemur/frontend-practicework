namespace Backend.Entities;

public class User(string username, string password, string? userPhoto)
{
    public Guid Id { get; set; }
    public string Username { get; set; } = username;
    public string Password { get; set; } = password;
    public string? UserPhoto { get; set; } = userPhoto;

    public ICollection<ReleaseRating> Ratings { get; set; } = new List<ReleaseRating>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<SavedRelease> SavedReleases { get; set; } = new List<SavedRelease>();
}