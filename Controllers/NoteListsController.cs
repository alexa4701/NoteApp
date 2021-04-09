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
    [Route("api/NoteLists")]
    [ApiController]
    public class NoteListsController : ControllerBase
    {
        private readonly NoteAppContext _context;
        public NoteListsController(NoteAppContext context)
        {
            _context = context;
        }

        // GET: api/NoteLists/5
        // Get NoteList by note list id - gets parent entity NoteBook and child entities Notes
        [HttpGet("{noteListId}")]
        public async Task<ActionResult<NoteList>> GetNoteList(long noteListId)
        {
            NoteList noteList = await _context.NoteLists
                .AsNoTracking()
                .Include(nl => nl.NoteBook)
                .Include(nl => nl.Notes)
                .FirstOrDefaultAsync(nl => nl.Id == noteListId);

            return noteList;
        }

        // POST: api/NoteLists/5
        // Create a NoteList and add to Notebook => Notebook.Id == noteBookId arg
        [HttpPost("{noteBookId}")]
        public async Task<ActionResult<NoteList>> CreateNoteListInBook(long noteBookId, NoteList noteList)
        {
            noteList.NoteBook = await _context.NoteBooks
                .Include(nb => nb.NoteLists)
                .FirstOrDefaultAsync(nb => nb.Id == noteBookId);
            noteList.Notes = new List<Note>();
            noteList.NoteBook.NoteLists.Add(noteList);
            _context.NoteLists.Add(noteList);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNoteList", new { id = noteList.Id }, noteList);
        }

        // DELETE: api/NoteLists/5
        // Delete NoteList with id == noteListId, and all child notes
        [HttpDelete("{noteListId}")]
        public async Task<IActionResult> DeleteNoteList(long noteListId)
        {
            NoteList noteList = await _context.NoteLists
                .Include(nl => nl.Notes)
                .FirstOrDefaultAsync(nl => nl.Id == noteListId);
            if (noteList == null)
            {
                return NotFound();
            }
            
            foreach(Note note in noteList.Notes)
            {
                _context.Notes.Remove(note);
            }

            _context.NoteLists.Remove(noteList);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}