using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.DbName;

namespace CoreReactReduxTypeScript.Contexts.DbName
{
    public partial class DbNameContext: DbContext
    {
        static private object lockObj = new object();

        public DbSet<Fetcher> Fetchers { get; set; }
        public DbSet<FetcherData> FetchersData { get; set; }

        public DbNameContext(DbContextOptions<DbNameContext> options) : base(options) { }
    }
}
