using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectTodo;
using System;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodo
{
    public partial class ProjectTodoContext
    {
        public async Task<List<FetcherDataModel>> GetStringsAsync() => await (
                from f in Fetchers
                join fd in FetchersData on f.FetcherId equals fd.FetcherId
                select new FetcherDataModel()
                {
                    Id = fd.Id,
                    Data = fd.Data,
                }
            ).ToListAsync();

        public async ValueTask<bool> AddNewStringAsync(FetcherDataModel model, int userId)
        {
            var user = await Users
                .Include(x => x.Fetcher)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (user == null) return false;
            if (user.Fetcher == null)
            {
                user.Fetcher = new Fetcher();
            }
            user.Fetcher.FetcherDataList.Add(new FetcherData()
            {
                Data = model.Data
            });

            try
            {
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

            return true;
        }
    }
}
