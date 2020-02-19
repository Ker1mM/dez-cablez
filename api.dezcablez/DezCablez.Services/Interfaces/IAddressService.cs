using DezCablez.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IAddressService
    {
        Task<Address> CreateUserAddressAsync(Address address, string username);

        Task<bool> DeleteAddressAsync(int addressId, string username);

        Task<ICollection<Address>> GetAllAddressesByUserUsername(string username);
    }
}
