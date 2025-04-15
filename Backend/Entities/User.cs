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
}