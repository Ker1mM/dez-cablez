using DezCablez.Data;
using DezCablez.Data.Models;
using DezCablez.Services.Exceptions;
using DezCablez.Services.Interfaces;
using DezCablez.Web.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services
{
    public class UserService : IUserService
    {
        private UserManager<User> userManager;
        private IConfiguration _config;
        private readonly DezCablezDBContext context;

        public UserService(UserManager<User> userManager, IConfiguration config, DezCablezDBContext context)
        {
            this.context = context;
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

        public async Task<bool> DeleteAddressAsync(int addressId, string username)
        {
            var user = await this.GetUserByUsernameAsync(username);
            if (user.ActiveAddressId == addressId)
            {
                user.ActiveAddressId = null;
            }
            var address = await this.context.Addresses.FirstOrDefaultAsync(x => x.Id == addressId && x.UserId == user.Id);

            if (address == null)
            {
                throw new NotFoundException(ExceptionMessages.NotFoundGenerator("Address", addressId.ToString()), "address");
            }

            this.context.Addresses.Remove(address);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<Address> CreateUserAddressAsync(Address address, string username)
        {
            var user = await this.GetUserByUsernameAsync(username);
            address.UserId = user.Id;

            if (user.ActiveAddressId == null)
            {
                user.ActiveAddress = address;
            }
            else
            {
                await this.context.Addresses.AddAsync(address);
            }

            await this.context.SaveChangesAsync();

            return address;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                throw new NotFoundException(ExceptionMessages.NotFoundGenerator("User", username), "user");
            }

            return user;
        }

        public string GetUserClaimFromJWT(string authToken, string claimType)
        {
            var rawToken = authToken.Split(' ')[1];

            var token = new JwtSecurityTokenHandler().ReadJwtToken(rawToken);
            var claim = token.Claims.First(c => c.Type == claimType).Value;

            return claim;
        }

        public async Task<ICollection<Address>> GetAllAddressesByUserUsername(string username)
        {
            var user = await this.GetUserByUsernameAsync(username);
            var addresses = await this.context.Addresses.Where(a => a.UserId == user.Id).ToListAsync();

            return addresses;
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
