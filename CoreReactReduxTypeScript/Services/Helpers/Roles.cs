using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactReduxTypeScript
{
    public static class Roles
    {
        public const string Admin       = "Admin";
        public const string Employee    = "Employee";
        public const string User        = "User";
        public const string Guest       = "Guest";

        public static IEnumerable<string> ProjectRoles
        {
            get
            {
                return new[]
                {
                    Admin,
                    Employee,
                    User,
                    Guest
                };
            }
        }
    }
}
