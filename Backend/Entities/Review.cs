﻿namespace Backend.Entities;

public class Review
{
    public Review(Guid userId, Guid releaseId, string reviewText)
    {
        UserId = userId;
        ReleaseId = releaseId;
        ReviewText = reviewText;
    }

    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ReleaseId { get; set; }
    public string ReviewText { get; set; }

    public User User { get; set; }
    public Release Release { get; set; }
}