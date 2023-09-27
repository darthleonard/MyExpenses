using Microsoft.EntityFrameworkCore;
using MyExpensesApi.Entities;
using MyExpensesApi.Features.Products;
using MyExpensesApi.Features.Shopping;
using MyExpensesApi.Features.Stores;

namespace MyExpensesApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<ShoppingRecord> Shoppings { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Store> Stores { get; set; }
    }
}