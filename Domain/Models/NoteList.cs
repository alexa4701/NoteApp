using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteList
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public NoteBook NoteBook { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}