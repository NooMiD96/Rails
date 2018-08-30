using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Models.ProjectTodo;

namespace CoreReactReduxTypeScript.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public static partial class DependencyInjections
    {
        public static async Task ProjectTodoDataBase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var projectTodoContext  = scope.ServiceProvider.GetRequiredService<ProjectTodoContext>();
                var UserManager         = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var RoleManager         = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                try
                {
                    await projectTodoContext.Database.MigrateAsync();

                    var users = await UserManager.GetUsersInRoleAsync(Roles.Admin);
                    if (users != null && users is List<ApplicationUser> userList && userList.Count > 0)
                        foreach (var user in userList)
                        {
                            var contextUser = await projectTodoContext
                                .Users
                                .FirstOrDefaultAsync(x => x.IdentityUserId.Equals(user.Id));

                            if (contextUser is null)
                            {
                                projectTodoContext
                                    .Users
                                    .Add(new User
                                    {
                                        IdentityUserId = user.Id,
                                    });
                            }
                        }
                    await projectTodoContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"\r\n\r\ninfo: Trouble with first connection to project database:\n{ex.Message}\r\n\r\n");
                }
                finally
                {
                    if (RoleManager != null)
                        RoleManager.Dispose();
                    if (UserManager != null)
                        UserManager.Dispose();
                    if (projectTodoContext != null)
                        projectTodoContext.Dispose();
                }
            }
        }
    }
}
