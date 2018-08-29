using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Contexts.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Helpers;

namespace CoreReactReduxTypeScript.Controllers
{
    public class HomeController: Controller
    {
        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewData["user"] = JsonHelper.Serialize(new
                {
                    userName = User.Identity.Name,
                    userType = User.GetUserRole()
                });
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