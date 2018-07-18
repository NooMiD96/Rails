using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Context
{
    public class Fetcher
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FetcherId { get; set; }

        public ICollection<FetcherData> FetchersDataList { get; set; } = new List<FetcherData>();

    }
}
