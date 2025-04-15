namespace Backend.Entities;

public class Review
{
    public Review(Guid userId, Guid albumId, string reviewText)
    {
        UserId = userId;
        AlbumId = albumId;
        ReviewText = reviewText;
    }
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public Guid AlbumId { get; set; }
    public string ReviewText { get; set; }
}