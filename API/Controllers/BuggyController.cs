using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController(DataContext context): BaseApiController
{
   [HttpGet("auth")]
   public ActionResult<string> GetAuth()
   {
      return "secret text";
   }

    [HttpGet("not-found")]
   public ActionResult<AppUser> GetNotFound()
   {
      var thing = context.Users.Find(-1);
      if(thing == null) return NotFound();
      return thing;
   }

    [HttpGet("server-error")]
   public ActionResult<AppUser> GetServeError()
   {
      try
      {
       var thing = context.Users.Find(-1) ?? throw new Exception("Nooooo!!");
       return thing;
      
      }
      catch(Exception ex)
      {
       return StatusCode(500,"Computer says no");
      }
           
   }

   [HttpGet("bad-request")]
   public ActionResult<string> GetBadRequest()
   {
      return BadRequest("no good!!");
   }

}
