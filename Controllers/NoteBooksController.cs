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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteBook>>> GetNoteBooks()
        {
            return await _context.NoteBooks.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<NoteBook>> CreateNoteBook(NoteBook noteBook)
        {
            _context.NoteBooks.Add(noteBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteBooks), new { id = noteBook.Id }, noteBook);
        }
    }
}