namespace CoreReactReduxTypeScript.Controllers.Api.Services
{
    public class AccountService
    {
        public object SuccessUserAuth(string userName, string userType) => new
        {
            data = new
            {
                userName,
                userType
            }
        };

        public object SuccessLogOut(string userName) => new { data = $"{userName} is logouted" };
    }
}
