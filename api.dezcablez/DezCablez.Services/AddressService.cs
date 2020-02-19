using DezCablez.Data;
using DezCablez.Data.Models;
using DezCablez.Services.Exceptions;
using DezCablez.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services
{
    public class AddressService : IAddressService
    {
        private readonly IUserService _userService;
        private readonly DezCablezDBContext _context;

        public AddressService(IUserService userService, DezCablezDBContext context)
        {
            this._userService = userService;
            this._context = context;
        }

        public async Task<ICollection<Address>> GetAllAddressesByUserUsername(string username)
        {
            var user = await this._userService.GetUserByUsernameAsync(username);
            var addresses = await this._context.Addresses.Where(a => a.UserId == user.Id).ToListAsync();

            return addresses;
        }


        public async Task<bool> DeleteAddressAsync(int addressId, string username)
        {
            var user = await this._userService.GetUserByUsernameAsync(username);
            if (user.ActiveAddressId == addressId)
            {
                user.ActiveAddressId = null;
            }
            var address = await this._context.Addresses.FirstOrDefaultAsync(x => x.Id == addressId && x.UserId == user.Id);

            if (address == null)
            {
                throw new NotFoundException(ExceptionMessages.NotFoundGenerator("Address", addressId.ToString()), "address");
            }

            this._context.Addresses.Remove(address);
            await this._context.SaveChangesAsync();

            return true;
        }

        public async Task<Address> CreateUserAddressAsync(Address address, string username)
        {
            var user = await this._userService.GetUserByUsernameAsync(username);
            address.UserId = user.Id;

            if (user.ActiveAddressId == null)
            {
                user.ActiveAddress = address;
            }
            else
            {
                await this._context.Addresses.AddAsync(address);
            }

            await this._context.SaveChangesAsync();


            return address;
        }
    }
}
