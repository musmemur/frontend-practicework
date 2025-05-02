using Backend.Entities;

namespace Backend.Dtos;

public class FullUserInfoDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string? UserPhoto { get; set; }
    public List<RatingForUserDto> Ratings { get; set; }

    public List<SavedReleasesForUserDto> SavedReleases { get; set; }
}