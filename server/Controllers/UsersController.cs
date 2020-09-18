﻿using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.Text;
using AutoMapper;
using WebApi.Controllers.ViewModels;

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
       
        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Email, model.Password);


            if (user == null)
            {
                return BadRequest(new { message = "Email or password is incorrect" });
            }


            // important todo - make work in new user structure
            //token - make security

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.ClientId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);


            // return basic user info and authentication token
            return Ok(new
            {
                //user.UserId,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Avatar,
                user.Role,
                Token = tokenString
            });
        }

        // [Authorize(Roles = Role.Admin)]
        // All existing users include clients + trainers
        [AllowAnonymous]
        [HttpGet("clients")]
        public IActionResult GetAllClients()
        {
            var clients =  _userService.GetAllClients();
            return Ok(clients);
        }

        [AllowAnonymous]
        [HttpGet("trainers")]
        public IActionResult GetAllTrainers()
        {
            var trainers = _userService.GetAllTrainers();

            return Ok(trainers);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user =  _userService.GetById(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("role/{role}")]
        public IActionResult GetByRole(string role)
        {

            var user = _userService.GetByRole(role);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("assignUsers")]
        public IActionResult AssignUsersToTrainer([FromBody] AssignUsersToTrainer model)
        {
            _userService.AssignUsersToTrainer(model.TrainerIds, model.UserIds);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("assignPlans")]
        public IActionResult AssignPlanToUser([FromBody] AssignPlansToUser model)
        {

            _userService.AssignPlanToUser(model.ClientIds, model.PlanIds);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<Client>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }


        // todo - make edit Client and Trainer - separately? - different values
        [AllowAnonymous]
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateUserModel model)
        {
            var user = _mapper.Map<Client>(model);
            user.ClientId = id;

            try
            {
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _userService.Delete(id);
            return Ok();
        }

    }
}
