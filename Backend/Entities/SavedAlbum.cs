namespace Backend.Entities;

public class SavedAlbum
{
    public SavedAlbum(Guid userId, Guid albumId)
    {
        UserId = userId;
        AlbumId = albumId;
    }
    
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid AlbumId { get; set; } 
}