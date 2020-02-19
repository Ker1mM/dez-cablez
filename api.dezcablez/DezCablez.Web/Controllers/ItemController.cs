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
        private readonly IImageService _imageService;
        public ItemController(IItemService itemService, IMapper mapper, IImageService imageService)
        {
            this._mapper = mapper;
            this._itemService = itemService;
            this._imageService = imageService;
        }

        [HttpPost]
        [Authorize] //TODO: Make admin only
        [Route("add")]
        public async Task<ActionResult> AddItem([FromBody] ItemModel model)
        {
            var item = this._mapper.Map<Item>(model);

            item = await this._itemService.CreateItemAsync(item);

            return Ok(new { message = "Item added successfully.", id = item.Id });
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ItemModel>> GetItem([FromRoute]string id)
        {
            var dbItem = await this._itemService.GetItemWithIdAsync(id);
            var item = this._mapper.Map<ItemModel>(dbItem);

            return Ok(item);
        }

        [HttpPost]
        [Route("image/change")]

        public async Task<IActionResult> ChangeThumbnail([FromBody]ItemImageDTO model)
        {
            await this._itemService.ChangeThumbnailAsync(model.ItemId, model.Link);

            return Ok(new { message = "Item thumbnail changed successfully.", id = model.ItemId });
        }
    }
}