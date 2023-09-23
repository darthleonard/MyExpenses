﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyExpensesApi.Data;

#nullable disable

namespace MyExpensesApi.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230923070816_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.9");

            modelBuilder.Entity("MyExpensesApi.Entities.AppUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastModDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MyExpensesApi.Entities.ShoppingDetailRecord", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Brand")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastModDate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("OnCar")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Quantity")
                        .HasColumnType("REAL");

                    b.Property<Guid?>("ShoppingRecordId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Store")
                        .HasColumnType("TEXT");

                    b.Property<double>("TotalAmount")
                        .HasColumnType("REAL");

                    b.Property<double>("UnitPrice")
                        .HasColumnType("REAL");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ShoppingRecordId");

                    b.ToTable("ShoppingDetails");
                });

            modelBuilder.Entity("MyExpensesApi.Entities.ShoppingRecord", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EffectiveDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastModDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("Total")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Shoppings");
                });

            modelBuilder.Entity("MyExpensesApi.Features.Products.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Brand")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastModDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("MyExpensesApi.Features.Stores.Store", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastModDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("MyExpensesApi.Entities.ShoppingDetailRecord", b =>
                {
                    b.HasOne("MyExpensesApi.Entities.ShoppingRecord", null)
                        .WithMany("Details")
                        .HasForeignKey("ShoppingRecordId");
                });

            modelBuilder.Entity("MyExpensesApi.Entities.ShoppingRecord", b =>
                {
                    b.Navigation("Details");
                });
#pragma warning restore 612, 618
        }
    }
}