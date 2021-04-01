namespace NoteApp.Domain.Models
{
   public class Note 
   {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Complete { get; set; }
        public long ListId { get; set; }
        
        public long NoteBookId { get; set; }
        public NoteBook NoteBook { get; set; }
   }
}