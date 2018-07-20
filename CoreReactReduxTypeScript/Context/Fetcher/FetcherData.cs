using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Context
{
    public class FetcherData
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(Fetcher))]
        public int FetcherId { get; set; }

        [Required]
        public string Data { get; set; }

        // parent
        public Fetcher Fetcher { get; set; }
    }

    public class FetcherDataModel
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "data")]
        public string Data { get; set; }
    }
}
