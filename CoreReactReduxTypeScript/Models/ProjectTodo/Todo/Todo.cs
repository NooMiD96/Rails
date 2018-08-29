using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreReactReduxTypeScript.Models.ProjectTodo
{
    public class Todo
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TodoId { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required]
        public DateTime CreateAt { get; set; }

        public DateTime LastUpdateAt { get; set; }

        // Parent
        public User User { get; set; }

        // Children
        public FetcherData FetcherDataList { get; set; }
    }
}
