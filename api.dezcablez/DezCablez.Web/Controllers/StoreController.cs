using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DezCablez.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IItemsService itemsService;

        public StoreController(IItemsService itemsService)
        {
            this.itemsService = itemsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetStore()
        {
            var allItems = await this.itemsService.GetAllItemsAsync();

            return Ok(allItems);
        }
    }
}