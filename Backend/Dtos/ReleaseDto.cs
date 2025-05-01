namespace Backend.Dtos;

public class ReleaseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Artist { get; set; }
    public string? ReleasePhoto { get; set; }
    
    public List<RatingDto> Ratings { get; set; }
    public List<ReviewDto> Reviews { get; set; }
}