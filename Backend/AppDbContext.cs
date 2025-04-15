using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public class AppDbContext : DbContext
{
    private readonly IConfiguration _configuration;
    public AppDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public DbSet<User> Users => Set<User>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
    }
}