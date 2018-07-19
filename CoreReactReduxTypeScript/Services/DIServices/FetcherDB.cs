using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using CoreReactReduxTypeScript.Context;
using Microsoft.EntityFrameworkCore;

namespace CoreReactReduxTypeScript.Services.DIServices
{
    /// <summary>
    /// class for initialize custom DI
    /// </summary>
    public partial class DIServices
    {
        public static async Task InitIFetcherDataBase(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            var medicineContext = serviceProvider.GetRequiredService<FetcherContext>();
            try
            {
                await medicineContext.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"info: Trouble with first connection to identity database:\n{ex.Message}");
            }
            finally
            {
                if (medicineContext != null)
                    medicineContext.Dispose();
            }
        }
    }
}
