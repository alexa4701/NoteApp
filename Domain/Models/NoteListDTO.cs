using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteListDTO
    {
        public long id { get; set; }
        public string title { get; set; }
        public long noteBookId { get; set; }
        public NoteDTO[] notes { get; set; }
    }
}