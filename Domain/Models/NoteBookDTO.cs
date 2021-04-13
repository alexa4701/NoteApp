using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class NoteBookDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public NoteListDTO[] NoteLists { get; set; }
    }
}