using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Models.ProjectTodo
{
    public class Fetcher
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FetcherId { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        // Parent
        public User User { get; set; }

        // Children
        public ICollection<FetcherData> FetcherDataList { get; set; } = new List<FetcherData>();
    }
}
