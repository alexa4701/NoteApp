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
    [Route("api/Notes")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NoteAppContext _context;
        public NotesController(NoteAppContext context)
        {
            _context = context;
        }

        // Get Note by Note.Id
        [HttpGet("{noteId}")]
        public async Task<ActionResult<Note>> GetNote(long noteId)
        {
            Note note = await _context.Notes
                .AsNoTracking()
                .Include(n => n.NoteList)
                .Where(n => n.Id == noteId)
                .FirstOrDefaultAsync();

            return note;
        }

        // Create Note and add to NoteList with NoteList.Id == noteListId
        [HttpPost("{noteListId}")]
        public async Task<ActionResult<Note>> CreateNoteInList(long noteListId, Note note)
        {  
            note.NoteList = await _context.NoteLists
                .Include(nl => nl.Notes)
                .FirstOrDefaultAsync(nl => nl.Id == noteListId);
            note.Complete = false;
            note.NoteList.Notes.Add(note);
            _context.Notes.Add(note);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

    }
}