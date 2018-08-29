using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Models.ProjectTodo
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        // Id of Identity's AspNetUser
        [Required]
        public string IdentityUserId { get; set; }

        // Children
        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
        public Fetcher Fetcher { get; set; }
    }
}
