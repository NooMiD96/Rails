using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactReduxTypeScript.Services
{
    public class AccountService
    {
        static public object SuccessAuthOrReg(string userName, string userRole) => new
        {
            data = new
            {
                userName,
                userType = userRole
            }
        };

        static public object SuccessLogOut(string userName) => new { data = $"{userName} is logouted" };
    }
}
