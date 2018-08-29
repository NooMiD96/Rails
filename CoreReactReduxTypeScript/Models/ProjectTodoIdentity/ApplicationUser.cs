using Microsoft.AspNetCore.Identity;

namespace CoreReactReduxTypeScript.Models.ProjectTodoIdentity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }

        public string UserId { get; set; }
    }
}
