using DezCablez.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(Order order, string username);

        Task<bool> CancelOrderAsync(int addressId, string username);

        Task<ICollection<Order>> GetAllOrdersByUsernameAsync(string username);
    }
}
