namespace Backend.Entities;

public class AlbumRating
{
    public AlbumRating(Guid userId, Guid albumId, uint rating)
    {
        UserId = userId;
        AlbumId = albumId;
        Rating = rating;
    }
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public Guid AlbumId { get; set; }
    public uint Rating { get; set; }
}