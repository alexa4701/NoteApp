using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Domain.Models;

namespace NoteApp.Controllers
{
    [EnableCors("CorsPolicy")]
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
        public async Task<ActionResult<NoteListDTO>> GetNoteList(long noteListId)
        {
            NoteList noteList = await _context.NoteLists
                .AsNoTracking()
                .Include(nl => nl.NoteBook)
                .Include(nl => nl.Notes)
                .FirstOrDefaultAsync(nl => nl.Id == noteListId);
            if (noteList == null)
            {
                return NotFound();
            }

            return NoteListToDTO(noteList);
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

        // PUT: api/NoteLists/5
        // Replace selected NoteList title with update NoteList title
        [HttpPut("{noteListId}")]
        public async Task<IActionResult> UpdateNoteListTitle(long noteListId, NoteList newNoteList)
        {
            if (noteListId != newNoteList.Id)
            {
                return BadRequest();
            }

            NoteList noteList = await _context.NoteLists.FirstOrDefaultAsync(nl => nl.Id == noteListId);
            if (noteList == null)
            {
                return NotFound();
            }

            noteList.Title = newNoteList.Title;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!(_context.NoteLists.Any(nl => nl.Id == noteListId)))
            {
                return NotFound();
            }

            return NoContent();
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

        private static NoteListDTO NoteListToDTO(NoteList noteList)
        {
            NoteListDTO noteListDTO = new NoteListDTO();
            List<NoteDTO> noteDTOs = new List<NoteDTO>();

            // Initialize noteListDTO
            noteListDTO.id = noteList.Id;
            noteListDTO.title = noteList.Title;
            noteListDTO.noteBookId = noteList.NoteBook.Id;

            foreach (Note note in noteList.Notes)
            {
                noteDTOs.Add(NoteToDTO(note));
            }
            noteListDTO.notes = noteDTOs.ToArray();

            return noteListDTO;
        }

        private static NoteDTO NoteToDTO(Note note) => 
            new NoteDTO
            {
                id = note.Id,
                title = note.Title,
                description = note.Description,
                complete = note.Complete,
                noteListId = note.NoteList.Id
            };
    }
}