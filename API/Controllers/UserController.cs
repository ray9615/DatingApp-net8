using System.Security.Claims;
using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.Execution;
using Azure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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

   [HttpPut]
   public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
   {
      var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

      if (string.IsNullOrEmpty(username))
      {
         return BadRequest("找不到使用者");
      }

      var user = await userRepository.GetUserByUsernameAsync(username);

      if (user == null)
      {
         return BadRequest("更新失敗，找不到使用者");
      }

      try
      {
         mapper.Map(memberUpdateDto, user);

         if (await userRepository.SaveAllAsync())
         {
               return NoContent();
         }
         else
         {
               return BadRequest("更新失敗");
         }
      }
      catch (Exception ex)
      {
         // 處理異常
         return BadRequest($"更新失敗: {ex.Message}");
      }
   }
}