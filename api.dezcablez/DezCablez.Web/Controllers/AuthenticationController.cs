using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using DezCablez.Web.Exceptions;
using DezCablez.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DezCablez.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        public AuthenticationController(IUserService userService, IMapper mapper)
        {
            this._userService = userService;
            this._mapper = mapper;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel model)
        {
            var authenticatedUser = await this._userService.AuthenticateAsync(model.Username, model.Password);

            if (authenticatedUser != null)
            {
                var token = this._userService.GenerateToken(authenticatedUser);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }

            return BadRequest(new { message = "Incorrect username or password" });
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody]RegisterModel model)
        {
            var user = this._mapper.Map<User>(model);

            var account = await this._userService.CreateAsync(user, model.Password);

            return Ok(new { message = $"Account with username: {account.UserName} created." });
        }
    }
}