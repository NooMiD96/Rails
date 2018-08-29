using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactReduxTypeScript.Models.ProjectTodo;

namespace CoreReactReduxTypeScript.Contexts.ProjectTodo
{
    public partial class ProjectTodoContext
    {
        public int GetUserIdByIdentityId(string identityId) => GetUserByIdentityId(identityId)?.UserId ?? 0;
        public User GetUserByIdentityId(string identityId) => Users
            .FirstOrDefault(x => x.IdentityUserId.Equals(identityId,
                                                         StringComparison.InvariantCultureIgnoreCase));

        public async ValueTask<bool> AddNewUserAsync(string identityId)
        {
            Users.Add(new User
            {
                IdentityUserId = identityId.ToLower(),
            });

            await SaveChangesAsync();

            return true;
        }
    }
}
