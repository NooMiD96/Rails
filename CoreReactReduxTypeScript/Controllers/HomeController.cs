using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Helpers;
using Microsoft.AspNetCore.Antiforgery;
using static CoreReactReduxTypeScript.Services.Helpers.Xsrf;

namespace CoreReactReduxTypeScript.Controllers
{
    public class HomeController: Controller
    {
        private readonly IAntiforgery _antiforgery;

        public HomeController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewData["user"] = JsonHelper.Serialize(new
                {
                    userName = User.Identity.Name,
                    userType = User.GetUserRole()
                });
                ViewData["xpt"] = XsrfToXpt(_antiforgery.GetTokens(HttpContext));
            }

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}