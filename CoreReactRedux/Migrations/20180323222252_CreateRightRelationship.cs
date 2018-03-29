using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoreReactRedux.Migrations
{
    public partial class CreateRightRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChildId",
                table: "DataClassParentTable");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChildId",
                table: "DataClassParentTable",
                nullable: false,
                defaultValue: 0);
        }
    }
}
