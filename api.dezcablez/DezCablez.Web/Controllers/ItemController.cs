using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using DezCablez.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DezCablez.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService, IMapper mapper)
        {
            this._mapper = mapper;
            this._itemService = itemService;
        }

        [HttpPost]
        [Authorize(Policy = Policies.Admin)]
        [Route("add")]
        public async Task<ActionResult> AddItem([FromBody] ItemModel model)
        {
            var item = this._mapper.Map<Item>(model);

            await this._itemService.CreateItemAsync(item);

            return Ok(new { message = "Item added successfully." });
        }
    }
}