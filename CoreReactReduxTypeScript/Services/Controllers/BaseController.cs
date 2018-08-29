using Microsoft.AspNetCore.Mvc;

namespace CoreReactReduxTypeScript.Controllers
{
    public class BaseController: ControllerBase
    {
        public IActionResult Ok(string res)
        {
            return this.Ok(new { data = res });
        }

        public IActionResult BadRequest(string res)
        {
            return this.Ok(new
            {
                error = res
            });
        }
    }
}