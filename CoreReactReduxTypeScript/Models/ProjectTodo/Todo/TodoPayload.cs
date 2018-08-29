using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Models.ProjectTodo
{
    public class TodoPayload
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TodoPayloadId { get; set; }

        [ForeignKey(nameof(Todo))]
        public int TodoId { get; set; }

        [Required]
        public string Payload { get; set; }

        // Parent
        public Todo Todo { get; set; }
    }
}
