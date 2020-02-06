using DezCablez.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DezCablez.Data.Shared
{
    public class Seeder
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<DezCablezDBContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                User userUser = new User()
                {
                    Email = "user@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "User",
                    UserType = "User"
                };

                User userAdmin = new User()
                {
                    Email = "Admin@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Admin",
                    UserType = "Admin"
                };

                userManager.CreateAsync(userUser, "123123");
                userManager.CreateAsync(userAdmin, "123123");
            }
        }
    }
}
