using System;
using System.Collections.Generic;
using System.Text;
using DezCablez.Data.Models;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IItemsService
    {
       Task<IEnumerable<Item>> GetAllItemsAsync();

       Task<IEnumerable<Item>> GetItemWithIdAsync(string id);
    }
}
