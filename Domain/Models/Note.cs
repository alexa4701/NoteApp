using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Domain.Models
{
   public class Note 
   {
        public long Id { get; set; }

        [StringLength(50, MinimumLength = 1)]
        [Required]
        public string Title { get; set; }
        
        [StringLength(50, MinimumLength = 1)]
        [Required]
        public string Description { get; set; }
        public bool Complete { get; set; }

        public NoteList NoteList { get; set; }
   }
}