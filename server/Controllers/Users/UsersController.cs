﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Common;
using WebApi.Controllers.ViewModels;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers.Users
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ApiControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppSettings _appSettings;
       
        public UsersController(
            IUserService userService,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            try
            {
                var user = _userService.Authenticate(model.Email, model.Password);
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.UserId),
                        new Claim(ClaimTypes.Role, user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
            
                return Ok(new
                {
                    user.UserId,
                    user.OrganizationId,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.Avatar,
                    user.Role,
                    Token = tokenString
                });
            }
            catch (Exception ex)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure(ex.Message)
                    .Build();
                
                return CommonResponse(failure);
            }
        }
        
        [AllowAnonymous]
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers();

            var mappedUsers = users.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();
            
            return Ok(mappedUsers);
        }
        
        [AllowAnonymous]
        [HttpGet("clients")]
        public IActionResult GetAllClients()
        {
            var clients =  _userService.GetAllClients();
            
            var mappedUsers = clients.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();
            
            return Ok(mappedUsers);
        }

        [AllowAnonymous]
        [HttpGet("trainers")]
        public IActionResult GetAllTrainers()
        {
            var trainers = _userService.GetAllTrainers();

            var mappedUsers = trainers.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();
            
            return Ok(mappedUsers);
        }

        [AllowAnonymous]
        /*[Authorize(Roles = Role.Admin + "," + Role.Owner)]*/
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
        public async Task<IActionResult> AssignUsersToTrainer([FromBody] AssignUsersToTrainer model)
        {
            try
            {
                await _userService.AssignClientsToTrainers(model.TrainerIds, model.UserIds);
            }
            catch (Exception ex)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure(ex.Message)
                    .Build();
                
                return CommonResponse(failure);
            }
            var success = ApiCommonResponse.Create()
                .WithSuccess()
                .Build();
            
            return CommonResponse(success);
        }

        [AllowAnonymous]
        [HttpPost("assignPlans")]
        public async Task<IActionResult> AssignPlanToUser([FromBody] AssignPlansToClient model)
        {
            try
            {
                await _userService.AssignPlanToClients(model.ClientIds, model.PlanIds);
            }
            catch (Exception ex)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure(ex.Message)
                    .Build();
                
                return CommonResponse(failure);
            }
            var success = ApiCommonResponse.Create()
                .WithSuccess()
                .Build();
            
            
            return CommonResponse(success);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateUserModel model)
        {
            try
            {
                await _userService.Update(id, model);
            }
            catch (AppException ex)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure(ex.Message)
                    .Build();

                return CommonResponse(failure);
            }
            var success = ApiCommonResponse.Create()
                .WithSuccess()
                .Build();


            return CommonResponse(success);
        }
        
        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _userService.Delete(id);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("trainerClients/{id}")]
        public async Task<IActionResult>  GetClientsByTrainer(string id)
        {
            var clients = await _userService.GetClientsByTrainer(id);

            if (clients == null)
                return NotFound();
            
            var mappedUsers = clients.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();

            return Ok(mappedUsers);
        }

        [AllowAnonymous]
        [HttpGet("clientTrainers/{id}")]
        public async Task<IActionResult>  GetTrainersByClient(string id)
        {
            var trainers = await _userService.GetTrainersByClient(id);

            if (trainers == null)
                return NotFound();

            var mappedUsers = trainers.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();

            return Ok(mappedUsers);
        }

    }
}
