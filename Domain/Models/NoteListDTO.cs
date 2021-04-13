using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteListDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public long NoteBookId { get; set; }
        public NoteDTO[] Notes { get; set; }
    }
}