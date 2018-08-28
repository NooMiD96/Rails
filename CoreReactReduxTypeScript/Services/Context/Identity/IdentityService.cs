using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CoreReactReduxTypeScript.Contexts.ProjectIdentity
{
    static public class UserManagerExtensions
    {
        static async public Task<string> GetRoleAsync<T>(this UserManager<T> userManager, T user) where T : class =>
            (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? "User";
    }
}
