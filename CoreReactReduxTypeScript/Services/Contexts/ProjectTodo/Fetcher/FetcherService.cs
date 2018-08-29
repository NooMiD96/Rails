using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Models.ProjectTodo;

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

        public async ValueTask<bool> AddNewStringAsync(FetcherDataModel model)
        {
            var fetcher = new Fetcher();
            fetcher.FetcherDataList.Add(new FetcherData()
            {
                Data = model.Data
            });

            Fetchers.Add(fetcher);

            await SaveChangesAsync();

            return true;
        }
    }
}
