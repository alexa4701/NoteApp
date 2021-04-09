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

        // GET: api/NoteBooks
        // Get all NoteBooks in table - doesn't get child entities NoteLists
        [HttpGet]
        public async Task<ActionResult<List<NoteBook>>> GetNoteBooks()
        {
            List<NoteBook> noteBooks = await _context.NoteBooks
                .AsNoTracking()
                .ToListAsync();

            return noteBooks;
        }

        // GET: api/NoteBooks/5
        // Get NoteBook by Id - also gets child entity NoteLists for selected NoteBook
        [HttpGet("{noteBookId}")]
        public async Task<ActionResult<NoteBook>> GetNoteBook(long noteBookId)
        {
            NoteBook noteBook = await _context.NoteBooks
                .AsNoTracking()
                .Include(nb => nb.NoteLists)
                .FirstOrDefaultAsync(nb => nb.Id == noteBookId);
            

            return noteBook;
        }

        // POST: api/NoteBooks
        // Create a new empty NoteBook
        [HttpPost]
        public async Task<ActionResult<NoteBook>> CreateNoteBook(NoteBook noteBook)
        {
            noteBook.NoteLists = new List<NoteList>();
            _context.NoteBooks.Add(noteBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteBooks), new { id = noteBook.Id }, noteBook);
        }

        // DELETE: api/NoteBooks/5
        // Delete NoteBook with id == noteBookId and all child NoteLists and Notes
        [HttpDelete("{noteBookId}")]
        public async Task<IActionResult> DeleteNoteBook(long noteBookId)
        {
            NoteBook noteBook = await _context.NoteBooks
                .Include(nb => nb.NoteLists)
                .FirstOrDefaultAsync(nb => nb.Id == noteBookId);
            if (noteBook == null)
            {
                return NotFound();
            }

            foreach(NoteList noteList in noteBook.NoteLists)
            {
                // Create new note obj with Notes loaded.
                NoteList noteListObj = await _context.NoteLists
                    .Include(nl => nl.Notes)
                    .FirstOrDefaultAsync(nl => nl.Id == noteList.Id);
                if (noteListObj == null)
                {
                    return NotFound();
                }

                foreach(Note note in noteListObj.Notes)
                {
                    _context.Notes.Remove(note);
                }
                _context.NoteLists.Remove(noteListObj);
            }

            _context.NoteBooks.Remove(noteBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}