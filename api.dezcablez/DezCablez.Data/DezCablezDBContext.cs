using DezCablez.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DezCablez.Data
{
    public class DezCablezDBContext : IdentityDbContext<User>
    {
        //DbSets...
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public DezCablezDBContext(DbContextOptions<DezCablezDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<OrderItem>()
            .HasKey(oi => new { oi.OrderId, oi.ItemId });

            base.OnModelCreating(builder);
        }
    }
}
