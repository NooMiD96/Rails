using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Contexts.DbName;
using CoreReactReduxTypeScript.Models.DbName;
using CoreReactReduxTypeScript.Helpers;

namespace CoreReactReduxTypeScript.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FetcherController : BaseController
    {
        private readonly DbNameContext _fetcher;

        public FetcherController([FromServices] DbNameContext fetcherContext)
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
            if (String.IsNullOrEmpty(fetcherReq.Data))
            {
                return BadRequest("Content is empty");
            }

            await _fetcher.AddNewStringAsync(fetcherReq);

            return Ok("Success");
        }
    }
}