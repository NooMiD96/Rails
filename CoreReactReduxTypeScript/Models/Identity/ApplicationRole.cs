using Microsoft.AspNetCore.Identity;

namespace CoreReactReduxTypeScript.Models.ProjectIdentity
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string RoleName) : base(RoleName) { }
    }
}
