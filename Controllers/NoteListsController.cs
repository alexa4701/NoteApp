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

        // Get NoteList by note list id - gets parent entity NoteBook and child entities Notes
        [HttpGet("{noteListId}")]
        public async Task<ActionResult<NoteList>> GetNoteList(long noteListId)
        {
            NoteList noteList = await _context.NoteLists
                .AsNoTracking()
                .Include(nl => nl.NoteBook)
                .Include(nl => nl.Notes)
                .Where(nl => nl.Id == noteListId)
                .FirstOrDefaultAsync();

            return noteList;
        }

        // Create a NoteList and add to Notebook => Notebook.Id == noteBookId arg
        [HttpPost("{noteBookId}")]
        public async Task<ActionResult<NoteList>> CreateNoteList(long noteBookId, NoteList noteList)
        {
            noteList.NoteBook = _context.NoteBooks
                .Include(nb => nb.NoteLists)
                .FirstOrDefault(nb => nb.Id == noteBookId);
            noteList.Notes = new List<Note>();
            noteList.NoteBook.NoteLists.Add(noteList);
            _context.NoteLists.Add(noteList);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNoteList", new { id = noteList.Id }, noteList);
        }
    }
}