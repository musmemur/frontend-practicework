namespace Backend.Entities;

public class Release
{
     public Release(string title, string artist, string releaseType, string? releasePhoto)
     {
          Title = title;
          Artist = artist;
          ReleaseType = releaseType;
          ReleasePhoto = releasePhoto;
     }

     public Guid Id { get; set; }
     public string Title { get; set; }
     public string Artist { get; set; }
     
     public string ReleaseType { get; set; }
     
     public string? ReleasePhoto { get; set; }

     public ICollection<ReleaseRating> Ratings { get; set; } = new List<ReleaseRating>();
     public ICollection<Review> Reviews { get; set; } = new List<Review>();
     public ICollection<SavedRelease> SavedByUsers { get; set; } = new List<SavedRelease>();
}