using System;
using System.Collections.Generic;
using System.Text;
using DezCablez.Data.Models;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IItemService
    {
        Task<IEnumerable<Item>> GetAllItemsAsync();

        Task<Item> GetItemWithIdAsync(string id);

        Task<Item> CreateItemAsync(Item item);

        Task<Item> AddImageToItemAsync(Item item, Image image);


        Task<Item> ChangeThumbnailAsync(string itemId, string link);
    }
}
