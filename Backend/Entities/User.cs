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

    public ICollection<AlbumRating> Ratings { get; set; } = new List<AlbumRating>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<SavedAlbum> SavedAlbums { get; set; } = new List<SavedAlbum>();
}