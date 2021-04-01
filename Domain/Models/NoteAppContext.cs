using Microsoft.EntityFrameworkCore;

namespace NoteApp.Domain.Models
{
    public class NoteAppContext : DbContext
    {
        public NoteAppContext(DbContextOptions<NoteAppContext> options) : base(options)
        {
        }

        public DbSet<NoteBook> NoteBooks { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}