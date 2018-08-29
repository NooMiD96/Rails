using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoreReactReduxTypeScript.Helpers
{
    public static class ClaimHelper
    {
        public const string ProjectTodoUserIdDefault = "ProjectTodo/User.UserId";

        public static int GetUserId(this ClaimsPrincipal claims)
        {
            var success = Int32.TryParse(claims.FindFirstValue(ProjectTodoUserIdDefault), out var userId);

            return success
                ? userId
                : throw new Exception("UserId is not found");
        }

        public static string GetUserRole(this ClaimsPrincipal claims) => claims
            .FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
    }
}
