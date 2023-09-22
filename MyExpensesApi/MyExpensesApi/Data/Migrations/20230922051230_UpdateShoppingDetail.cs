using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyExpensesApi.Data.Migrations
{
    public partial class UpdateShoppingDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingDetails_Shoppings_ShoppingId",
                table: "ShoppingDetails");

            migrationBuilder.AlterColumn<Guid>(
                name: "ShoppingId",
                table: "ShoppingDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ShoppingDetails",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "ShoppingDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModDate",
                table: "ShoppingDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingDetails_Shoppings_ShoppingId",
                table: "ShoppingDetails",
                column: "ShoppingId",
                principalTable: "Shoppings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingDetails_Shoppings_ShoppingId",
                table: "ShoppingDetails");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "ShoppingDetails");

            migrationBuilder.DropColumn(
                name: "LastModDate",
                table: "ShoppingDetails");

            migrationBuilder.AlterColumn<Guid>(
                name: "ShoppingId",
                table: "ShoppingDetails",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ShoppingDetails",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingDetails_Shoppings_ShoppingId",
                table: "ShoppingDetails",
                column: "ShoppingId",
                principalTable: "Shoppings",
                principalColumn: "Id");
        }
    }
}
