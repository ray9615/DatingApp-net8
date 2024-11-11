using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
  public AppUser()
    {
        Photos = new List<Photo>();
    }
  public int Id { get; set; }
  
  public required string UserName { get; set; }

  public byte[] PasswordHash { get; set; } = [];

  public byte[] PasswordSalt { get; set; }= [];

  public DateTime  DateOfBirth { get; set; }

  public required string KnownAs { get; set; }

  public DateTime Created { get; set; } = DateTime.UtcNow;

  public DateTime LastActive { get; set; }= DateTime.UtcNow;

  public required string Gender { get; set; }

  public string? Introdution { get; set; }

  public string? LookingFor { get; set; }
  public string? Interests { get; set; }
  public string? City { get; set; }
  public string? Country { get; set; }
  public List<Photo> Photos { get; set; } = new();  // 使用初始化器

  // public int GetAge()
  // {
  //   return DateOfBirth.CalculateAge();
  // }
}