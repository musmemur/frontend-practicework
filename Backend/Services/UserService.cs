using System.IdentityModel.Tokens.Jwt;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Backend.Services;

using System.Security.Claims;

public class UserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? GetUserId()
    {
        var user = _httpContextAccessor.HttpContext?.User;

        var userIdString = user?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value
                           ?? user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        return Guid.TryParse(userIdString, out var userId) ? userId : null;
    }
    
}
