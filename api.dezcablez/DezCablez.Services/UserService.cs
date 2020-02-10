using DezCablez.Data.Models;
using DezCablez.Services.Exceptions;
using DezCablez.Services.Interfaces;
using DezCablez.Web.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services
{
    public class UserService : IUserService
    {
        private UserManager<User> userManager;
        private IConfiguration _config;

        public UserService(UserManager<User> userManager, IConfiguration config)
        {
            this.userManager = userManager;
            this._config = config;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {

            var user = await userManager.FindByNameAsync(username);

            if (user != null && await userManager.CheckPasswordAsync(user, password))
            {
                return user;
            }

            return null;
        }

        public async Task<User> CreateAsync(User user, string password)
        {
            if (await this.userManager.FindByNameAsync(user.UserName) != null)
            {
                throw new TakenException(ExceptionMessages.TakenGenerator("Username"), "username");
            }

            if (await this.userManager.FindByEmailAsync(user.Email) != null)
            {
                throw new TakenException(ExceptionMessages.TakenGenerator("Email"), "email");
            }

            user.SecurityStamp = Guid.NewGuid().ToString();
            user.UserType = "User";

            await this.userManager.CreateAsync(user, password);

            return user;
        }

        public JwtSecurityToken GenerateToken(User user)
        {
            var authClaims = new[]
               {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.UserType)
                };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtOptions:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _config["JwtOptions:Issuer"],
                audience: _config["JwtOptions:Audience"],
                expires: DateTime.UtcNow.AddMinutes(10),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
