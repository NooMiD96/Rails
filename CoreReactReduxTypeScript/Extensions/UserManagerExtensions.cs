using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactReduxTypeScript.UserManagerExtensions
{
    static public class UserManagerExtensions
    {
        static async public Task<string> GetRoleAsync<T>(this UserManager<T> userManager, T user) where T : class =>
            (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User";
    }
}
