using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.Execution;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[Authorize]
public class UserController( IUserRepository userRepository, IMapper mapper): BaseApiController
{
   [HttpGet]
   public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
   {
      var users = await userRepository.GetMembersAsync();

      //var userToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
      return Ok(users);
   }

   [HttpGet("{username}")]
   public async Task<ActionResult<MemberDto>> GetUsers(string username)
   {
      var user = await userRepository.GetMemberAsync(username);

      if(User == null) return NotFound();

      return user;
   }

}