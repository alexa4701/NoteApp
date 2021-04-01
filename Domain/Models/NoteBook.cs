using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteBook
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public List<Note> Notes { get; set; }
    }
}