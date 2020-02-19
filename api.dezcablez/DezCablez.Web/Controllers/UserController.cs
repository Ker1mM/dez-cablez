

using AutoMapper;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using DezCablez.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAddressService _addressService;
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;


        public UserController(IUserService userService, IMapper mapper, IAddressService addressService, IOrderService orderService)
        {
            this._userService = userService;
            this._mapper = mapper;
            this._addressService = addressService;
            this._orderService = orderService;
        }

        [HttpPost]
        [Route("address/add")]
        [Authorize]
        public async Task<IActionResult> AddAddress([FromBody]AddressInfoModel model)
        {
            var address = this._mapper.Map<Address>(model);
            var added = await this._addressService.CreateUserAddressAsync(address, User.Identity.Name);

            return Ok(new { message = $"Address with ID:{added.Id} was added to user: ${User.Identity.Name}", id = added.Id });
        }

        [HttpDelete]
        [Route("address/delete")]
        [Authorize]
        public async Task<IActionResult> DeleteAddress([FromBody]DeleteAddressModel model)
        {
            await this._addressService.DeleteAddressAsync(model.AddressId, User.Identity.Name);

            return Ok(new { message = $"{User.Identity.Name} address with ID: {model.AddressId} deleted!" });
        }

        [HttpGet]
        [Route("info")]
        [Authorize]
        public async Task<ActionResult<UserInfoModel>> GetUserInfo()
        {
            var user = await this._userService.GetUserByUsernameAsync(User.Identity.Name);
            var returnModel = this._mapper.Map<UserInfoModel>(user);

            return Ok(returnModel);
        }

        [HttpGet]
        [Route("address/all")]
        [Authorize]
        public async Task<ActionResult<ICollection<AddressInfoModel>>> GetAllUserAddresses()
        {
            var addresses = await this._addressService.GetAllAddressesByUserUsername(User.Identity.Name);
            var returnModel = addresses.Select(x => this._mapper.Map<AddressInfoModel>(x)).ToList();

            return returnModel;
        }

        [HttpPost]
        [Route("order/add")]
        [Authorize]
        public async Task<IActionResult> AddOrder([FromBody]OrderInfoModel model)
        {
            var order = this._mapper.Map<Order>(model);

            var result = await this._orderService.CreateOrderAsync(order, User.Identity.Name);

            return Ok(new { message = $"Order with ID:{result.Id} was added to user: ${User.Identity.Name}", id = result.Id });
        }

        [HttpGet]
        [Route("order/all")]
        [Authorize]
        public async Task<ICollection<OrderInfoModel>> GetAllOrders()
        {
            var orders = await this._orderService.GetAllOrdersByUsernameAsync(User.Identity.Name);
            var returnModel = orders.Select(x => this._mapper.Map<OrderInfoModel>(x)).ToList();

            return returnModel;
        }
    }
}