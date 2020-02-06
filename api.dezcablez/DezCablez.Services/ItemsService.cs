using System;
using System.Collections.Generic;
using System.Text;
using DezCablez.Data.Models;
using DezCablez.Data;
using DezCablez.Services.Interfaces;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DezCablez.Services
{
    public class ItemsService : IItemsService
    {
        private readonly DezCablezDBContext context;

        public ItemsService(DezCablezDBContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            var items = await context.Items.ToListAsync();

            return items;
        }

        public async Task<IEnumerable<Item>> GetItemWithIdAsync(string id)
        {
            var item = await context.Items.Where(x => x.Id == id).ToListAsync();

            return item;
        }
    }
}
