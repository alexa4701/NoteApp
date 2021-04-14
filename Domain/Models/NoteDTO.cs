namespace NoteApp.Domain.Models
{
    public class NoteDTO
    {
        public long id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool complete { get; set; }
        public long noteListId { get; set; }
    }
}