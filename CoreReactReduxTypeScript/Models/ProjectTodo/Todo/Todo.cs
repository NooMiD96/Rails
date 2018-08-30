using System;
using System.Collections.Generic;
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
        public TodoList TodoList { get; set; }
    }

    public class TodoPayload
    {
        public bool Done { get; set; }
        public string Content { get; set; }
    }

    public class TodoModel
    {
        public int TodoId { get; set; }
        public string Label { get; set; }
        public IEnumerable<TodoPayload> TodoPayloads { get; set; }
    }
}
