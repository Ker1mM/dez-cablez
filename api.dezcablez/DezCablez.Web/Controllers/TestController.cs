using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DezCablez.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DezCablez.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("getuser")]
        [Authorize(Policy = Policies.User)]
        public IActionResult GetAdmin()
        {
            var userName = User.Identity.Name;


            return Ok($"Username: {userName} Allowed: User");
        }

        [HttpGet]
        [Route("getadmin")]
        [Authorize(Policy = Policies.Admin)]
        public IActionResult GetUser()
        {
            var userName = User.Identity.Name;


            return Ok($"Username: {userName} Allowed: Admin");
        }

        [HttpGet]
        [Route("get")]
        [Authorize]
        public IActionResult Get()
        {
            var userName = User.Identity.Name;


            return Ok($"Username: {userName} Allowed: ALL");
        }
    }
}