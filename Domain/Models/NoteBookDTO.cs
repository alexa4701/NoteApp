using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteBookDTO
    {
        public long id { get; set; }
        public string title { get; set; }
        public NoteListDTO[] noteLists { get; set; }
    }
}