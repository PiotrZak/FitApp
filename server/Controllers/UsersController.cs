﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Helpers;
using AutoMapper;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
       private readonly AppSettings _appSettings;
       
        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
            // _appSettings = appSettings.Value;
        }

        // [AllowAnonymous]
        // [HttpPost("authenticate")]
        // public IActionResult Authenticate([FromBody]AuthenticateModel model)
        // {
        //     var user = _userService.Authenticate(model.Username, model.Password);

        //     if (user == null)
        //         return BadRequest(new { message = "Username or password is incorrect" });

        //     return Ok(user);
        // }

        // [Authorize(Roles = Role.Admin)]
        // [HttpGet]
        // public IActionResult GetAll()
        // {
        //     var users =  _userService.GetAll();
        //     return Ok(users);
        // }

        // [AllowAnonymous]
        // [HttpGet("{id}")]
        // public IActionResult GetById(int id)
        // {

        //     // only allow admins to access other user records
        //     //var currentUserId = int.TryParse(User.Identity.Name, out number);
        //     //if (id != currentUserId && !User.IsInRole(Role.Admin))
        //     //    return Forbid();

        //     var user =  _userService.GetById(id);

        //     if (user == null)
        //         return NotFound();

        //     return Ok(user);
        // }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an cexception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
