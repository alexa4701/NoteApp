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
                if(context.NoteBooks.Any())
                {
                    // DB already has content
                    return;
                }
                
                context.AddRange(
                    new NoteBook
                    {
                        Title = "My 1st Notebook",
                        NoteLists = 
                            new List<NoteList>
                            {
                                new NoteList
                                {
                                    Title = "Note List 1",
                                    Notes = 
                                        new List<Note>
                                        {
                                            new Note 
                                            { 
                                                Title = "A note",
                                                Description = "note description",
                                                Complete = true
                                            },
                                            new Note
                                            {
                                                Title = "Second note",
                                                Description = "another note description",
                                                Complete = false 
                                            },
                                            new Note
                                            {
                                                Title = "Third note",
                                                Description = "wow a third description",
                                                Complete = false
                                            }
                                        }
                                },
                                new NoteList
                                {
                                    Title = "Grocery list",
                                    Notes = 
                                        new List<Note>
                                        {
                                            new Note
                                            {
                                                Title = "Tomatoes",
                                                Description = "Get tomatoes",
                                                Complete = false
                                            },
                                            new Note
                                            {
                                                Title = "Jalapenos",
                                                Description = "Get jalapenos",
                                                Complete = false
                                            }
                                        }
                                }
                            }
                    },
                    new NoteBook
                    {
                        Title = "Second test notebook",
                        NoteLists = 
                        new List<NoteList>
                            {
                                new NoteList
                                {
                                    Title = "Clean the house",
                                    Notes = 
                                        new List<Note>
                                        {
                                            new Note 
                                            { 
                                                Title = "Dust",
                                                Description = "spread dust around the house",
                                                Complete = true
                                            },
                                            new Note
                                            {
                                                Title = "Vacuum",
                                                Description = "remove all gas from home",
                                                Complete = false 
                                            },
                                            new Note
                                            {
                                                Title = "Disinfect",
                                                Description = "use the nozzle",
                                                Complete = false
                                            }
                                        }
                                }
                            }
                    });

                context.SaveChanges();
            }
        }
    }
}