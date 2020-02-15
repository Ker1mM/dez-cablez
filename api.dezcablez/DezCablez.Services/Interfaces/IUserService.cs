using DezCablez.Data.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(string username, string password);

        Task<User> CreateAsync(User user, string password);

        JwtSecurityToken GenerateToken(User user);

        string GetUserClaimFromJWT(string authToken, string claimType);

        Task<User> GetUserByUsernameAsync(string username);

        Task<Address> CreateUserAddressAsync(Address address, string username);

        Task<bool> DeleteAddressAsync(int addressId, string username);

        Task<ICollection<Address>> GetAllAddressesByUserUsername(string username);
    }
}
