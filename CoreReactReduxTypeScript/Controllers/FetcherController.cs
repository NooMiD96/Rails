using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.Context;
using CoreReactReduxTypeScript.Services;

namespace CoreReactReduxTypeScript.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FetcherController : BaseController
    {
        private readonly FetcherContext _fetcher;

        public FetcherController([FromServices] FetcherContext fetcherContext)
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