using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(DataContext context, ItokenService tokenService
    ,IMapper mapper): BaseApiController
    {
        [HttpPost("register")] // account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username)) return BadRequest("使用者名稱重複");
            
            using var hmac = new HMACSHA512();
            var user = mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

           
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs = user.KnownAs
            };
        }
        [HttpPost("login")] 
        public async Task<ActionResult<UserDto>> Login(LoginDTO loginDTO)
        {
            var user = await context.Users.FirstOrDefaultAsync(x=> x.UserName == loginDTO.Username.ToLower());

            if(user == null ) return Unauthorized("帳號錯誤!!");
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("密碼錯誤!!");
            }
               return new UserDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Token = tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url
            };
        }        
        private async Task<bool> UserExists(string UserName)
        {
          return await context.Users.AnyAsync( x => x.UserName.ToLower() == UserName.ToLower());
        }
    }
   
}
