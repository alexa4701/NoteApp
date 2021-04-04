using Microsoft.EntityFrameworkCore;

namespace NoteApp.Domain.Models
{
    public class NoteAppContext : DbContext
    {
        public NoteAppContext(DbContextOptions<NoteAppContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteList> NoteLists { get; set; }
        public DbSet<NoteBook> NoteBooks { get; set; }
    }
}