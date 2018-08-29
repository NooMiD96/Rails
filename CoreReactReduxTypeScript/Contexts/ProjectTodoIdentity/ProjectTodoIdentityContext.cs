using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodoIdentity
{
    public class ProjectTodoIdentityContext: IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ProjectTodoIdentityContext(DbContextOptions<ProjectTodoIdentityContext> options) : base(options) { }
    }
}
