using Microsoft.EntityFrameworkCore.Migrations;

namespace NoteApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NoteBooks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteBooks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NoteLists",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoteBookId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoteLists_NoteBooks_NoteBookId",
                        column: x => x.NoteBookId,
                        principalTable: "NoteBooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Complete = table.Column<bool>(type: "bit", nullable: false),
                    NoteListId1 = table.Column<long>(type: "bigint", nullable: true),
                    NoteListId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_NoteBooks_NoteListId1",
                        column: x => x.NoteListId1,
                        principalTable: "NoteBooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notes_NoteLists_NoteListId",
                        column: x => x.NoteListId,
                        principalTable: "NoteLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoteLists_NoteBookId",
                table: "NoteLists",
                column: "NoteBookId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_NoteListId",
                table: "Notes",
                column: "NoteListId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_NoteListId1",
                table: "Notes",
                column: "NoteListId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "NoteLists");

            migrationBuilder.DropTable(
                name: "NoteBooks");
        }
    }
}
