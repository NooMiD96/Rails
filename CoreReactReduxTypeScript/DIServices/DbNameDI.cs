using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Contexts.DbName;

namespace CoreReactReduxTypeScript.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public static partial class DependencyInjections
    {
        public static async Task DbNameDataBase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            var dbNameContext = serviceProvider.GetRequiredService<DbNameContext>();
            try
            {
                await dbNameContext.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"info: Trouble with first connection to identity database:\n{ex.Message}");
            }
            finally
            {
                if (dbNameContext != null)
                    dbNameContext.Dispose();
            }
        }
    }
}
