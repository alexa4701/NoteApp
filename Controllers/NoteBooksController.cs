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
        public async Task<ActionResult<NoteBookDTO[]>> GetNoteBooks()
        {
            List<NoteBookDTO> noteBooks = await _context.NoteBooks
                .AsNoTracking()
                .Select(nb => NoteBookToDTO(nb))
                .ToListAsync();

            return noteBooks.ToArray();
        }

        // GET: api/NoteBooks/5
        // Get NoteBook by Id - also gets child entities, NoteLists and Notes, for selected NoteBook
        [HttpGet("{noteBookId}")]
        public async Task<ActionResult<NoteBookDTO>> GetNoteBook(long noteBookId)
        {
            NoteBook noteBook = await _context.NoteBooks
                .AsNoTracking()
                .Include(nb => nb.NoteLists)
                .ThenInclude(nl => nl.Notes)
                .AsSplitQuery()
                .OrderBy(nb => nb.Id)
                .FirstOrDefaultAsync(nb => nb.Id == noteBookId);
            if (noteBook == null)
            {
                return NotFound();
            }

            return NoteBookToDTO(noteBook);
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

        // PUT: api/NoteBooks/5
        // Replace selected NoteBook title with updated notebook title.
        [HttpPut("{noteBookId}")]
        public async Task<IActionResult> UpdateNoteBookTitle(long noteBookId, NoteBook newNoteBook)
        {
            if (noteBookId != newNoteBook.Id)
            {
                return BadRequest();
            }

            NoteBook noteBook = await _context.NoteBooks.FirstOrDefaultAsync(nl => nl.Id == noteBookId);

            if (noteBook == null)
            {
                return NotFound();
            }

            noteBook.Title = newNoteBook.Title;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!(_context.NoteBooks.Any(nb => nb.Id == noteBookId)))
            {
                return NotFound();
            }

            return NoContent();
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

                foreach (Note note in noteListObj.Notes)
                {
                    _context.Notes.Remove(note);
                }
                _context.NoteLists.Remove(noteListObj);
            }

            _context.NoteBooks.Remove(noteBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static NoteBookDTO NoteBookToDTO(NoteBook noteBook)
        {
            NoteBookDTO noteBookDTO = new NoteBookDTO();

            // Initialize NoteBookDTO
            noteBookDTO.id = noteBook.Id;
            noteBookDTO.title = noteBook.Title;

            if (noteBook.NoteLists == null)
            {
                noteBookDTO.noteLists = null;
            }
            else
            {
                List<NoteListDTO> noteListDTOs = new List<NoteListDTO>();
                // Convert NoteLists to NoteListDTOs, and add to noteListDTOs
                foreach (NoteList noteList in noteBook.NoteLists)
                {
                    noteListDTOs.Add(NoteListToDTO(noteList));
                }
                noteBookDTO.noteLists = noteListDTOs.ToArray();
            }   

            return noteBookDTO;
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