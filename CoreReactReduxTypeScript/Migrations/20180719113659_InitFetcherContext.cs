using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreReactReduxTypeScript.Migrations
{
    public partial class InitFetcherContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fetchers",
                columns: table => new
                {
                    FetcherId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fetchers", x => x.FetcherId);
                });

            migrationBuilder.CreateTable(
                name: "FetchersData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FetcherId = table.Column<int>(nullable: false),
                    Data = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FetchersData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FetchersData_Fetchers_FetcherId",
                        column: x => x.FetcherId,
                        principalTable: "Fetchers",
                        principalColumn: "FetcherId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FetchersData_FetcherId",
                table: "FetchersData",
                column: "FetcherId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FetchersData");

            migrationBuilder.DropTable(
                name: "Fetchers");
        }
    }
}
