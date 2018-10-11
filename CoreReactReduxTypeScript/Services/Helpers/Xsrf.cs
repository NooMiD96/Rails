using Microsoft.AspNetCore.Antiforgery;
using static CoreReactReduxTypeScript.Helpers.JsonHelper;

namespace CoreReactReduxTypeScript.Services.Helpers
{
    static public class Xsrf
    {
        static public string XsrfToXpt(AntiforgeryTokenSet xpt) => Serialize(new
        {
            __xpt_cookie = xpt.CookieToken,
            __xpt_request = xpt.RequestToken,
            __xpt_header_name = xpt.HeaderName
        });
    }
}
