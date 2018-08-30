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
            if (todo is null)
            {
                return new TodoModel();
            }
            var todoModel = new TodoModel
            {
                TodoId = todo.TodoId,
                Label = todo.TodoList.Label,
                TodoPayloads = JsonHelper.Deserialize<IEnumerable<TodoPayload>>(todo.TodoList.Payload),
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
                    Label = todoList.Label,
                    Payload = JsonHelper.Serialize(todoList.TodoPayloads),
                }
            };
            return todo;
        }
    }
}
