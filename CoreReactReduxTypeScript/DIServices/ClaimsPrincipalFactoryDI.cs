using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CoreReactReduxTypeScript.Helpers;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;

namespace CoreReactReduxTypeScript.DIServices
{
    public class ClaimsPrincipalFactoryDI: UserClaimsPrincipalFactory<ApplicationUser, ApplicationRole>
    {
        private readonly ProjectTodoContext _context;

        public ClaimsPrincipalFactoryDI(UserManager<ApplicationUser> userManager,
                                        RoleManager<ApplicationRole> roleManager,
                                        IOptions<IdentityOptions> optionsAccessor,
                                        [FromServices] ProjectTodoContext context
                                        ) : base(userManager, roleManager, optionsAccessor)
        {
            _context = context;
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser appUser)
        {
            var identity = await base.GenerateClaimsAsync(appUser);

            var userId = _context.GetUserIdByIdentityId(appUser.Id);
            identity.AddClaim(new Claim(ClaimHelper.ProjectTodoUserIdDefault, userId.ToString()));

            return identity;
        }
    }
}
