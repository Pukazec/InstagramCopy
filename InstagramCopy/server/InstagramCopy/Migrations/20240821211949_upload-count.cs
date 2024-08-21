using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InstagramCopy.Migrations
{
    /// <inheritdoc />
    public partial class uploadcount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubscriptionLastChangedAt",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "DesiredSubscriptionPlan",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TodayUploadCount",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DesiredSubscriptionPlan",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TodayUploadCount",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<DateTime>(
                name: "SubscriptionLastChangedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
