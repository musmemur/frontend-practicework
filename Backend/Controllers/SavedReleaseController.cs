using Backend.Contracts;
using Backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

// [ApiController]
// [Route("[controller]")]
// public class SavedReleaseController(AppDbContext dbContext, JwtService jwtService) : ControllerBase
// {
//     [HttpPost("save")]
//     [Authorize]
//     public async Task<IActionResult> CreateSavedRelease([FromBody] CreateSavedReleaseRequest request, CancellationToken ct)
//     {
//         var existing = await dbContext.SavedReleases
//             .FirstOrDefaultAsync(r => r.UserId == request.UserId && r.ReleaseId == request.ReleaseId, ct);
//
//         if (existing != null)
//         {
//             return Conflict("Релиз уже сохранён пользователем.");
//         }
//
//         var savedRelease = new SavedRelease(request.UserId, request.ReleaseId);
//
//         dbContext.SavedReleases.Add(savedRelease);
//         await dbContext.SaveChangesAsync(ct);
//
//         return Ok(new { savedRelease.Id });
//     }
// }