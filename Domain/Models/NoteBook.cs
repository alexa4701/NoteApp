using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Domain.Models
{
    public class NoteBook
    {
        public long Id { get; set; }
        
        [StringLength(50, MinimumLength = 1)]
        [Required]
        public string Title { get; set; }
        public ICollection<NoteList> NoteLists { get; set; }
    }
}