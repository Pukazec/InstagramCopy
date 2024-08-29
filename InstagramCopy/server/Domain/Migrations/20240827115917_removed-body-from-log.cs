using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstagramCopy.Migrations
{
    /// <inheritdoc />
    public partial class removedbodyfromlog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestBody",
                schema: "App",
                table: "InstagramLog");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RequestBody",
                schema: "App",
                table: "InstagramLog",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
