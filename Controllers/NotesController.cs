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

        // GET: api/Notes/5
        // Get Note by Note.Id
        [HttpGet("{noteId}")]
        public async Task<ActionResult<Note>> GetNote(long noteId)
        {
            Note note = await _context.Notes
                .AsNoTracking()
                .Include(n => n.NoteList)
                .FirstOrDefaultAsync(n => n.Id == noteId);

            return note;
        }

        // POST: api/Notes/5
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

        // PUT: api/Notes/5
        // Replace the selected note obj with updated note obj
        [HttpPut("{noteId}")]
        public async Task<IActionResult> UpdateNote(long noteId, Note newNote)
        {
            if (noteId != newNote.Id)
            {
                return BadRequest();
            }

            Note note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteId);
            if (note == null)
            {
                return NotFound();
            }

            note.Title = newNote.Title;
            note.Description = newNote.Description;
            note.Complete = newNote.Complete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!(_context.Notes.Any(n => n.Id == noteId)))
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/Notes/5
        // Delete the note with id == noteId
        [HttpDelete("{noteId}")]
        public async Task<IActionResult> DeleteNote(long noteId)
        {
            Note note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteId);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}