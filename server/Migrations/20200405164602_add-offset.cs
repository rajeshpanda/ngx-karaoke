using Microsoft.EntityFrameworkCore.Migrations;

namespace karoke_api_dotnetcore.Migrations
{
    public partial class addoffset : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Offset",
                table: "Karaokes",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Offset",
                table: "Karaokes");
        }
    }
}
