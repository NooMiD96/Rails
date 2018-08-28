using Microsoft.AspNetCore.Identity;

namespace CoreReactReduxTypeScript.Models.ProjectIdentity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }
    }
}
