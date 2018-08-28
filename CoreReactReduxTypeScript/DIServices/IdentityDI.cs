using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CoreReactReduxTypeScript.Contexts.ProjectIdentity;
using CoreReactReduxTypeScript.Models.ProjectIdentity;

namespace CoreReactReduxTypeScript.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public static partial class DependencyInjections
    {
        public static async Task IdentityDataBase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            var identityContext = serviceProvider.GetRequiredService<ProjectIdentityContext>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            try
            {
                identityContext.Database.Migrate();

                var roleNames = new string[] { "Admin", "User", "Guest" };
                IdentityResult roleResult;

                foreach (var roleName in roleNames)
                {
                    var roleExist = await RoleManager.RoleExistsAsync(roleName);
                    if (!roleExist)
                    {
                        roleResult = await RoleManager.CreateAsync(new ApplicationRole(roleName));

                        if (!roleResult.Succeeded)
                            throw new Exception("Can't add roles in database");
                    }
                }

                var admins = Configuration.GetSection("Admins").GetChildren();
                foreach (var admin in admins)
                {
                    var userName = admin["UserName"];
                    var password = admin["Password"];

                    var _user = await UserManager.FindByNameAsync(userName);
                    if (_user == null)
                    {
                        var poweruser = new ApplicationUser
                        {
                            UserName = userName,
                        };

                        var createPowerUser = await UserManager.CreateAsync(poweruser, password);
                        if (createPowerUser.Succeeded)
                        {
                            await UserManager.AddToRoleAsync(poweruser, "Admin");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"info: Trouble with first connection to identity database:\n{ex.Message}");
            }
            finally
            {
                if (RoleManager != null)
                    RoleManager.Dispose();
                if (UserManager != null)
                    UserManager.Dispose();
                if (identityContext != null)
                    identityContext.Dispose();
            }
        }
    }
}
