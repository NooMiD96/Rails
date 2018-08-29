using CoreReactReduxTypeScript;

namespace CoreReactReduxTypeScript.Controllers.Api.Services
{
    public static class AccountService
    {
        public static object SuccessUserAuth(string userName, Roles role) => new
        {
            data = new
            {
                userName,
                userType = role.ToString()
            }
        };

        public static object SuccessLogOut(string userName) => new { data = $"{userName} is logouted" };
    }
}
