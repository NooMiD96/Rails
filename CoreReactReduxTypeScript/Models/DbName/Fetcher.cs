using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Models.DbName
{
    public class Fetcher
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FetcherId { get; set; }

        public ICollection<FetcherData> FetcherDataList { get; set; } = new List<FetcherData>();

    }
}
