using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodo;
using CoreReactReduxTypeScript.Helpers;

namespace CoreReactReduxTypeScript.Controllers.AdminApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : BaseController
    {
        private readonly ProjectTodoContext _context;

        public TodoController([FromServices] ProjectTodoContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            return Ok(JsonHelper.Serialize("Ok"));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Post([FromBody] FetcherDataModel fetcherReq)
        {
            return Ok("Success");
        }
    }
}