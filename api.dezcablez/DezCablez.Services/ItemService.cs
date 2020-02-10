﻿using System;
using System.Collections.Generic;
using System.Text;
using DezCablez.Data.Models;
using DezCablez.Data;
using DezCablez.Services.Interfaces;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DezCablez.Web.Exceptions;
using DezCablez.Services.Exceptions;

namespace DezCablez.Services
{
    public class ItemService : IItemService
    {
        private readonly DezCablezDBContext context;

        public ItemService(DezCablezDBContext context)
        {
            this.context = context;
        }

        public async Task<Item> CreateItemAsync(Item item)
        {
            if (await this.context.Items.AnyAsync(it => it.Id == item.Id))
            {
                throw new TakenException(ExceptionMessages.TakenGenerator("Id"), "Id");
            }

            await this.context.Items.AddAsync(item);
            await this.context.SaveChangesAsync();

            return item;
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
