using Microsoft.AspNetCore.Identity;

namespace CoreReactReduxTypeScript.Models.ProjectTodoIdentity
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string RoleName) : base(RoleName) { }
    }
}
