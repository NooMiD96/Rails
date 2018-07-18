using Microsoft.EntityFrameworkCore;

namespace CoreReactReduxTypeScript.Context
{
    public partial class FetcherContext: DbContext
    {
        static private object lockObj = new object();

        public DbSet<Fetcher> Fetchers { get; set; }
        public DbSet<FetcherData> FetchersData { get; set; }

        public FetcherContext(DbContextOptions<FetcherContext> options) : base(options) { }
    }
}
