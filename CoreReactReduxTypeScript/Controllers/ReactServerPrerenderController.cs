using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;

namespace CoreReactReduxTypeScript.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactServerPrerenderController: BaseController
    {
        private INodeServices _nodeService;

        public ReactServerPrerenderController([FromServices] INodeServices nodeService)
        {
            _nodeService = nodeService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var prerender = await Prerenderer.RenderToString(
                "ClientApp/public",
                _nodeService,
                default,
                new JavaScriptModuleExport("server/main-server"),
                "",
                "",
                new {
                    bundleName = "Home"
                },
                15 * 1000,
                Request.PathBase.ToString()
            );

            return Ok(prerender.Html);
        }
    }
}