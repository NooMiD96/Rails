using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;

namespace CoreReactReduxTypeScript.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public static partial class DependencyInjections
    {
        public static async Task ProjectTodoDataBase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            var projectTodoContext = serviceProvider.GetRequiredService<ProjectTodoContext>();
            try
            {
                await projectTodoContext.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"info: Trouble with first connection to identity database:\n{ex.Message}");
            }
            finally
            {
                if (projectTodoContext != null)
                    projectTodoContext.Dispose();
            }
        }
    }
}
