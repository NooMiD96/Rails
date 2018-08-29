using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using CoreReactReduxTypeScript;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodoIdentity
{
    public static class UserManagerExtensions
    {
        public static async Task<string> GetRoleAsync<T>(this UserManager<T> userManager, T user) where T : class =>
            (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? Roles.User;

        public static async Task<IdentityResult> AddToRoleAsync<T>(this UserManager<T> userManager, T user, string role) where T : class =>
            await userManager.AddToRoleAsync(user, role);
    }
}
