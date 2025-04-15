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
}