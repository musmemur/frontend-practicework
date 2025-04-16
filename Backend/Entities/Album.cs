namespace Backend.Entities;

public class Album
{
     public Album(string title, string artist)
     {
          Title = title;
          Artist = artist;
     }

     public Guid Id { get; set; }
     public string Title { get; set; }
     public string Artist { get; set; }

     public ICollection<AlbumRating> Ratings { get; set; } = new List<AlbumRating>();
     public ICollection<Review> Reviews { get; set; } = new List<Review>();
     public ICollection<SavedAlbum> SavedByUsers { get; set; } = new List<SavedAlbum>();
}