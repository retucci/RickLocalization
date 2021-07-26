using Microsoft.EntityFrameworkCore;
using RickLocalization.Domain.Entities;

namespace RickLocalization.Repository
{
    public class RickLocalizationContext : DbContext
    {
        public RickLocalizationContext(DbContextOptions<RickLocalizationContext> options) : base (options)
        {
            
        }

        public DbSet<Rick> Ricks { get; set; }
        public DbSet<Morty> Mortys { get; set; }
        public DbSet<Dimension> Dimensions { get; set; }
    }
}