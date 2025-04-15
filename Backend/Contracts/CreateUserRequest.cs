namespace Backend.Contracts;

public record CreateUserRequest(string Username, string Password, string? UserPhoto);

