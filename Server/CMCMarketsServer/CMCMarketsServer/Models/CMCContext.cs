using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMCMarketsServer.Models
{
    public class CMCContext: DbContext
    {
        public CMCContext(DbContextOptions<CMCContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //composite key
            modelBuilder.Entity<OrderProduct>().HasKey(x => new { x.OrderId, x.ProductId });
            modelBuilder.Entity<Product>().HasData(new Product (){ ProductId = 1, ProductName = "Cricket Bat", Price = 12.99, ProductDescription = "Cricket Bat made of premium wood." });

        }
        public DbSet<Models.Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

    }
}
