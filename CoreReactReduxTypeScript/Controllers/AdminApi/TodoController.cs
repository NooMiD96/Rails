using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CoreReactReduxTypeScript.Controllers.AdminApi.Services;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodo;
using CoreReactReduxTypeScript.Helpers;
using CoreReactReduxTypeScript;

namespace CoreReactReduxTypeScript.Controllers.AdminApi
{
    [Authorize(Roles = Roles.Admin + ", " + Roles.Employee)]
    [Route("adminapi/[controller]")]
    [ApiController]
    public class TodoController : BaseController
    {
        private readonly ProjectTodoContext _context;
        private readonly TodoService _service;

        public TodoController([FromServices] ProjectTodoContext context)
        {
            _context = context;
            _service = new TodoService();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetFirstTodoList()
        {
            var todo = await _context.GetTodoListAsync(User.GetUserId());
            var todoListModel = _service.ConvertToModel(todo);

            return Ok(JsonHelper.Serialize(todoListModel));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveTodoList([FromBody] TodoModel todoListModel)
        {
            var todoList = _service.Deserialize(todoListModel);
            var success = await _context.SaveTodoList(User.GetUserId(), todoList);

            return Ok("Success");
        }
    }
}