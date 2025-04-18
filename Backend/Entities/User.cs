namespace Backend.Entities;

public class User
{
    public User(string username, string password, string? userPhoto)
    {
        Username = username;
        Password = password;
        UserPhoto = userPhoto;
    }

    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string? UserPhoto { get; set; }

    public ICollection<ReleaseRating> Ratings { get; set; } = new List<ReleaseRating>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<SavedRelease> SavedReleases { get; set; } = new List<SavedRelease>();
}