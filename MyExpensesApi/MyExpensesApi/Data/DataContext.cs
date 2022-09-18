using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Entities;

namespace MyExpensesApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}