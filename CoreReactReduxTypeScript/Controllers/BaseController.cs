using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            return this.BadRequest(new
            {
                Error = res
            });
        }
    }
}