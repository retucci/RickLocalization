using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RickLocalization.Repository.Migrations
{
    public partial class RickLocalizationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ricks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "varchar(100)", nullable: false),
                    Description = table.Column<string>(type: "varchar(255)", nullable: true),
                    Image = table.Column<string>(nullable: true),
                    QI = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ricks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dimensions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Original = table.Column<int>(nullable: false),
                    Code = table.Column<string>(type: "varchar(4)", nullable: false),
                    TravelDate = table.Column<DateTime>(type: "DateTime", nullable: false),
                    RickId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dimensions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dimensions_Ricks_RickId",
                        column: x => x.RickId,
                        principalTable: "Ricks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mortys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "varchar(100)", nullable: false),
                    Description = table.Column<string>(type: "varchar(255)", nullable: true),
                    RickId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mortys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mortys_Ricks_RickId",
                        column: x => x.RickId,
                        principalTable: "Ricks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dimensions_RickId",
                table: "Dimensions",
                column: "RickId");

            migrationBuilder.CreateIndex(
                name: "IX_Mortys_RickId",
                table: "Mortys",
                column: "RickId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dimensions");

            migrationBuilder.DropTable(
                name: "Mortys");

            migrationBuilder.DropTable(
                name: "Ricks");
        }
    }
}
