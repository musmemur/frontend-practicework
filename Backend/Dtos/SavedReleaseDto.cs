namespace Backend.Dtos;

public class SavedReleaseDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ReleaseId { get; set; }
}