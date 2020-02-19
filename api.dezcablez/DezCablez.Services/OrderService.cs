using DezCablez.Data;
using DezCablez.Data.Enums;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services
{
    public class OrderService : IOrderService
    {
        private readonly DezCablezDBContext _context;
        private readonly IUserService _userService;

        public OrderService(DezCablezDBContext context, IUserService userService)
        {
            this._context = context;
            this._userService = userService;
        }

        public Task<bool> CancelOrderAsync(int addressId, string username)
        {
            throw new NotImplementedException();
        }

        public async Task<Order> CreateOrderAsync(Order order, string username)
        {
            var user = await this._userService.GetUserByUsernameAsync(username);
            order.UserId = user.Id;
            order.Price = order.OrderItems.Sum(x => x.Quantity * x.UnitPrice);
            order.Status = OrderStatus.Received;

            await this._context.Orders.AddAsync(order);

            await this._context.SaveChangesAsync();

            return order;
        }

        public async Task<ICollection<Order>> GetAllOrdersByUsernameAsync(string username)
        {
            var user = await this._userService.GetUserByUsernameAsync(username);
            var orders = await this._context.Orders
                .Include(x => x.OrderItems)
                .ThenInclude(x => x.Item)
                .Where(x => x.UserId == user.Id).ToListAsync();

            return orders;
        }

    }
}
