using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectTodo;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodo
{
    public partial class ProjectTodoContext: DbContext
    {
        static private object lockObj = new object();

        public DbSet<User> Users { get; set; }

        public DbSet<Fetcher> Fetchers { get; set; }
        public DbSet<FetcherData> FetchersData { get; set; }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<TodoPayload> TodoPayloads { get; set; }

        public ProjectTodoContext(DbContextOptions<ProjectTodoContext> options) : base(options) { }
    }
}
