using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Domain.Models;

namespace NoteApp.Controllers
{
    [Route("api/NoteBooks")]
    [ApiController]
    public class NoteBooksController : ControllerBase
    {
        private readonly NoteAppContext _context;

        public NoteBooksController(NoteAppContext context)
        {
            _context = context;
        }

        // Get all NoteBooks in table - doesn't get child entities NoteLists
        [HttpGet]
        public async Task<ActionResult<List<NoteBook>>> GetNoteBooks()
        {
            List<NoteBook> noteBooks = await _context.NoteBooks
                .AsNoTracking()
                .ToListAsync();

            return noteBooks;
        }

        // Get NoteBook by Id - also gets child entity NoteLists for selected NoteBook
        [HttpGet("{noteBookId}")]
        public async Task<ActionResult<NoteBook>> GetNoteBook(long noteBookId)
        {
            NoteBook noteBook = await _context.NoteBooks
                .AsNoTracking()
                .Include(nb => nb.NoteLists)
                .Where(nb => nb.Id == noteBookId)
                .FirstOrDefaultAsync();
            

            return noteBook;
        }

        // Create a new empty NoteBook
        [HttpPost]
        public async Task<ActionResult<NoteBook>> CreateNoteBook(NoteBook noteBook)
        {
            noteBook.NoteLists = new List<NoteList>();
            _context.NoteBooks.Add(noteBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteBooks), new { id = noteBook.Id }, noteBook);
        }
    }
}