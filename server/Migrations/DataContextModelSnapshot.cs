﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebApi.Helpers;

namespace WebApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("WebApi.Entities.Category", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("WebApi.Entities.Exercise", b =>
                {
                    b.Property<string>("ExerciseId")
                        .HasColumnType("text");

                    b.Property<string>("CategoryId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<List<byte[]>>("Files")
                        .HasColumnType("bytea[]");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PlanId")
                        .HasColumnType("text");

                    b.Property<int>("Series")
                        .HasColumnType("integer");

                    b.Property<int>("Times")
                        .HasColumnType("integer");

                    b.HasKey("ExerciseId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlanId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("WebApi.Entities.Plan", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("WebApi.Entities.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("bytea");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("Role")
                        .HasColumnType("text");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Entities.Exercise", b =>
                {
                    b.HasOne("WebApi.Entities.Category", null)
                        .WithMany("Exercises")
                        .HasForeignKey("CategoryId");

                    b.HasOne("WebApi.Entities.Plan", null)
                        .WithMany("Exercises")
                        .HasForeignKey("PlanId");
                });
#pragma warning restore 612, 618
        }
    }
}
