using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectIdentity;

namespace CoreReactReduxTypeScript.Contexts.ProjectIdentity
{
    public class ProjectIdentityContext: IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ProjectIdentityContext(DbContextOptions<ProjectIdentityContext> options) : base(options) { }
    }
}
