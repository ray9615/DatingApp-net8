using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
     public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
     {
        services.AddControllers();
        services.AddDbContext<DataContext>(options => 
        {
            options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddScoped<ItokenService, TokenServie>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        return services;
     }
}
