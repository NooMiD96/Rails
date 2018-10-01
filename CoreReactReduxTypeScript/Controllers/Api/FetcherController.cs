using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodo;
using CoreReactReduxTypeScript.Helpers;

namespace CoreReactReduxTypeScript.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FetcherController: BaseController
    {
        private readonly ProjectTodoContext _fetcher;

        public FetcherController([FromServices] ProjectTodoContext fetcherContext)
        {
            _fetcher = fetcherContext;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetStrings()
        {
            var res = await _fetcher.GetStringsAsync();
            return Ok(JsonHelper.Serialize(res));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveString([FromBody] FetcherDataModel fetcherReq)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return BadRequest("Need auth before the add new line");
            }
            if (String.IsNullOrEmpty(fetcherReq.Data))
            {
                return BadRequest("Content is empty");
            }

            await _fetcher.AddNewStringAsync(fetcherReq, User.GetUserId());

            return Ok("Success");
        }
    }
}