using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactReduxTypeScript.Helpers;
using CoreReactReduxTypeScript.Models.ProjectTodo;

namespace CoreReactReduxTypeScript.Controllers.AdminApi.Services
{
    public class TodoService
    {
        public TodoModel ConvertToModel(Todo todo)
        {
            var todoModel = new TodoModel
            {
                TodoId = todo.TodoId,
                TodoPayloads = JsonHelper.Deserialize<IEnumerable<TodoPayload>>(todo.TodoList.Payload)
            };
            return todoModel;
        }

        public Todo Deserialize(TodoModel todoList)
        {
            var todo = new Todo
            {
                TodoId = todoList.TodoId,
                LastUpdateAt = DateTime.Now,
                TodoList = new TodoList
                {
                    Payload = JsonHelper.Serialize(todoList.TodoPayloads),
                }
            };
            return todo;
        }
    }
}
