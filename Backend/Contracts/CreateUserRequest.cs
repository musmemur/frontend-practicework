namespace Backend.Contracts;

public record CreateUserRequest(string Username, string Password, Photo? UserPhoto);

