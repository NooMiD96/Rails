using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectTodo;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodo
{
    public partial class ProjectTodoContext
    {
        public async Task<Todo> GetTodoListAsync(int userId) => await Todos
            .Include(x => x.TodoList)
            .FirstOrDefaultAsync(x => x.UserId == userId);

        public async ValueTask<bool> SaveTodoList(int userId, Todo todo)
        {
            var contextTodo = await Todos.Include(x => x.TodoList)
                                         .FirstOrDefaultAsync(x => x.TodoId == todo.TodoId);

            if (contextTodo != null)
            {
                //need test
                Entry(contextTodo)
                    .Context
                    .Attach(todo)
                    .State = EntityState.Modified;
            }
            else
            {
                var user = Users.Include(x => x.Todos)
                                 .First(x => x.UserId == userId);
                user.Todos.Add(todo);
                //or this case, need test
                // Users.First(x => x.UserId == userId)
                //      .Todos
                //      .Add(todo);
            }

            await SaveChangesAsync();

            return true;
        }
    }
}
