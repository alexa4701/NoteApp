using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Collections.Generic;

namespace NoteApp.Domain.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new NoteAppContext(serviceProvider
                    .GetRequiredService<DbContextOptions<NoteAppContext>>()))
            {
                if(context.NoteBooks.Any() || context.Notes.Any())
                {
                    // DB already has content
                    return;
                }

                // Create test notes
                var Note1 = new Note 
                { 
                    Title="a note",
                    Description="longer description text",
                    Complete=false,
                    ListId=0
                };
                var Note2 = new Note 
                { 
                    Title="second note",
                    Description="longer description text",
                    Complete=false,
                    ListId=0
                };
                var Note3 = new Note 
                { 
                    Title="third note",
                    Description="longer description text",
                    Complete=false,
                    ListId=1
                };
                var Note4 = new Note 
                { 
                    Title="another note",
                    Description="longer description text",
                    Complete=false,
                    ListId=1
                };
                var Note5 = new Note 
                { 
                    Title="yet another note",
                    Description="longer description text",
                    Complete=false,
                    ListId=0
                };
                var Note6 = new Note 
                { 
                    Title="wow! another note",
                    Description="longer description text",
                    Complete=false,
                    ListId=0
                };
                var Note7 = new Note 
                { 
                    Title="you guessed it - another note",
                    Description="longer description text",
                    Complete=false,
                    ListId=0
                };

                // Create and add test notebooks to db
                context.AddRange(
                    new NoteBook
                    {
                        Title="my notebook",
                        Notes= new List<Note> 
                        {
                            Note1,
                            Note2,
                            Note3,
                            Note4
                        }
                    },
                    new NoteBook
                    {
                        Title="Notebook 2",
                        Notes= new List<Note>
                        {
                            Note5,
                            Note6,
                            Note7
                        }
                    }
                );

                context.SaveChanges();
            }
        }
    }
}