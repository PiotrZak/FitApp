﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace WebApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    AuthorId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.AuthorId);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Published = table.Column<bool>(nullable: false),
                    Genre = table.Column<string>(nullable: true),
                    AuthorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_Authors_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Authors",
                        principalColumn: "AuthorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    OrganizationId = table.Column<string>(nullable: true),
                    Avatar = table.Column<byte[]>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<int>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    AdminId = table.Column<string>(nullable: true),
                    ClientId = table.Column<string>(nullable: true),
                    OwnerId = table.Column<string>(nullable: true),
                    TrainerId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClientsTrainers",
                columns: table => new
                {
                    TrainerId = table.Column<string>(nullable: false),
                    ClientId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsTrainers", x => new { x.ClientId, x.TrainerId });
                    table.ForeignKey(
                        name: "FK_ClientsTrainers_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsTrainers_Users_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    PlanId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    CreatorId = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    OrganizationId = table.Column<string>(nullable: true),
                    ClientUserId = table.Column<string>(nullable: true),
                    TrainerUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.PlanId);
                    table.ForeignKey(
                        name: "FK_Plans_Users_ClientUserId",
                        column: x => x.ClientUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plans_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plans_Users_TrainerUserId",
                        column: x => x.TrainerUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClientsPlans",
                columns: table => new
                {
                    ClientId = table.Column<string>(nullable: false),
                    PlanId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsPlans", x => new { x.ClientId, x.PlanId });
                    table.ForeignKey(
                        name: "FK_ClientsPlans_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsPlans_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "PlanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    ExerciseId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Times = table.Column<int>(nullable: false),
                    Series = table.Column<int>(nullable: false),
                    Weight = table.Column<int>(nullable: false),
                    Files = table.Column<List<byte[]>>(nullable: true),
                    CategoryId = table.Column<string>(nullable: true),
                    PlanId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.ExerciseId);
                    table.ForeignKey(
                        name: "FK_Exercises_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "PlanId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "AuthorId", "Name" },
                values: new object[] { 1, "Stephen King" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Title" },
                values: new object[,]
                {
                    { "1", "Amatorskie" },
                    { "2", "Średnio-Zaawansowane" },
                    { "3", "Profesjonalistyczne" }
                });

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "OrganizationId", "Name" },
                values: new object[,]
                {
                    { "O1", "Apple" },
                    { "O2", "Google" },
                    { "O3", "Microsoft" }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorId", "Genre", "Name", "Published" },
                values: new object[,]
                {
                    { "5", 1, "Mystery", "The Langoleers", true },
                    { "4", 1, "Mystery", "IT", true }
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "ExerciseId", "CategoryId", "Description", "Files", "Name", "PlanId", "Series", "Times", "Weight" },
                values: new object[,]
                {
                    { "o", "3", "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością", null, "Triceps", null, 5, 1, 7 },
                    { "n", "3", " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.", null, "Uginanie na łydki stojąc", null, 27, 2, 35 },
                    { "m", "3", "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.", null, "Uginanie na dwójki na maszynie", null, 0, 0, 43 },
                    { "l", "3", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy ciąg sumo", null, 0, 0, 35 },
                    { "k", "3", "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.", null, "Wznosy bokiem", null, 3, 5, 25 },
                    { "j", "3", "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.", null, "Wyciskanie na płaskiej", null, 2, 5, 60 },
                    { "a", "1", "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.", null, "Podciąganie nad chwyt", null, 7, 4, 0 },
                    { "h", "2", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy Ciąg", null, 0, 0, 43 },
                    { "g", "2", "", null, "Martwy ciąg sumo", null, 0, 0, 35 },
                    { "f", "2", "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.", null, "Spacer farmera", null, 0, 0, 25 },
                    { "e", "1", "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?", null, "Spiętki", null, 7, 4, 0 },
                    { "d", "1", "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.", null, "Deska bokiem", null, 27, 2, 0 },
                    { "c", "1", "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!", null, "Glut bridge jednorożec", null, 9, 3, 15 },
                    { "i", "2", "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.", null, "Uginanie na łydki stojąc", null, 27, 2, 35 },
                    { "b", "1", "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.", null, "Przysiady ze sztangą (high bar)", null, 7, 4, 45 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "TrainerId" },
                values: new object[,]
                {
                    { "o2t1", null, "Trainer", "tbullerwell1n@sitemeter.com", "Talia", "Bullerwell", "O2", "Talia", null, null, 777777777, "Trainer", "t-organization", "o2t1" },
                    { "o2t2", null, "Trainer", "mbabb1x@java.com", "Malachi", "Babb", "O2", "Malachi", null, null, 777777777, "Trainer", "t-organization", "o2t2" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "ClientId" },
                values: new object[,]
                {
                    { "o3u1", null, "Client", "thilldrupe@berkeley.edu", "Titus", "Hilldrup", "O3", "Titus", null, null, 555555555, "User", "t-user", "o3u1" },
                    { "o3u2", null, "Client", "mtamesf@netvibes.com", "Maribel", "Tames", "O3", "Maribel", null, null, 666666666, "User", "t-trainer", "o3u2" },
                    { "o3u5", null, "Client", "gcamidgej@umich.edu", "Godfry", "Camidge", "O3", "Godfry", null, null, 555555555, "User", "t-user", "o3u5" },
                    { "o3u4", null, "Client", "jsarrell3@whitehouse.gov", "Jarret", "Sarrell", "O3", "Jarret", null, null, 777777777, "User", "t-trainer", "o2u4" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "OwnerId" },
                values: new object[] { "owner2", null, "Owner", "owner2@eventbrite.com", "Owner2", "lol", "O2", "Owner2", null, null, 555555555, "Owner", null, "fc599d0d-21a1-4a37-ba42-4975540a3741" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "ClientId" },
                values: new object[] { "o3u6", null, "Client", "mcorbyl@comsenz.com", "Maison", "Corby", "O3", "Bondy", null, null, 666666666, "User", "t-trainer", "o3u6" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "OwnerId" },
                values: new object[] { "owner3", null, "Owner", "owner3@eventbrite.com", "Owner3", "lol", "O3", "Owner3", null, null, 555555555, "Owner", null, "142efb3b-b584-4be2-b8d3-808145015b34" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "TrainerId" },
                values: new object[,]
                {
                    { "o3t1", null, "Trainer", "bdunstan8@dell.com", "Benedikta", "Dunstan", "O3", "Valentia", null, null, 777777777, "Trainer", "t-organization", "o3t1" },
                    { "o3t2", null, "Trainer", "fhobdena@census.gov", "Freddie", "Hobden", "O3", "Eadith", null, null, 777777777, "Trainer", "t-organization", "o3t2" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "ClientId" },
                values: new object[,]
                {
                    { "o3u3", null, "Client", "tknowldenh@wsj.com", "Trumann", "Knowlden", "O3", "Trumann", null, null, 555555555, "User", "t-user", "o3u3" },
                    { "o2u6", null, "Client", "gpedlingham6@ow.ly", "Gerald", "Pedlingham", "O2", "Bondy", null, null, 666666666, "User", "t-trainer", "o2u6" },
                    { "o2u2", null, "Client", "gkryska1@about.com", "Georgie", "Kryska", "O2", "Jillana", null, null, 666666666, "User", "t-trainer", "o2u2" },
                    { "o2u4", null, "Client", "jsarrell3@whitehouse.gov", "Jarret", "Sarrell", "O2", "Kiel", null, null, 777777777, "User", "t-trainer", "o2u4" },
                    { "o2u3", null, "Client", "kcridge2@xrea.com", "Kiah", "Cridge", "O2", "Teodor", null, null, 555555555, "User", "t-user", "o2u3" },
                    { "o2u1", null, "Client", "jmeachem0@eventbrite.com", "Jacklyn", "Meachem", "O2", "Jacklyn", null, null, 555555555, "User", "t-user", "o2u1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "TrainerId" },
                values: new object[,]
                {
                    { "t2", null, "Trainer", "efearey1f@mlb.com", "Eadith", "Fearey", "O1", "Eadith", null, null, 777777777, "Trainer", "t-organization", "t2" },
                    { "t1", null, "Trainer", "vmaccathay17@house.gov", "Valentia", "MacCathay", "O1", "Valentia", null, null, 777777777, "Trainer", "t-organization", "t1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "ClientId" },
                values: new object[,]
                {
                    { "u6", null, "Client", "bcaullieres@auda.org.au", "Bondy", "Caulliere", "O1", "Bondy", null, null, 666666666, "User", "t-trainer", "u6" },
                    { "u5", null, "Client", "awharinu@tmall.com", "Augustus", "Wharin", "O1", "Augustus", null, null, 555555555, "User", "t-user", "u5" },
                    { "u4", null, "Client", "kburgne2@hp.com", "Kiel", "Burgne", "O1", "Kiel", null, null, 777777777, "User", "t-trainer", "u4" },
                    { "u3", null, "Client", "Teloinic@gmail.com", "Camille", "Teloinic", "O1", "Teodor", null, null, 555555555, "User", "t-user", "u3" },
                    { "u2", null, "Client", "jcasson3@prlog.org", "Jillana", "Casson", "O1", "Jillana", null, null, 666666666, "User", "t-trainer", "u2" },
                    { "u1", null, "Client", "tgianelli0@eventbrite.com", "Teodoor", "Gianelli", "O1", "Teodor", null, null, 555555555, "User", "t-user", "u1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "AdminId" },
                values: new object[] { "a1", null, "Admin", "tgianelli0@eventbrite.com", "admin", "lol", "O1", "admin", null, null, 555555555, "Admin", null, "9141a3b0-24a8-44d3-a7bc-7cb949e451ca" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "ClientId" },
                values: new object[] { "o2u5", null, "Client", "flydiate5@biblegateway.com", "Felice", "Lydiate", "O2", "Augustus", null, null, 555555555, "User", "t-user", "o2u5" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role", "Token", "OwnerId" },
                values: new object[] { "owner1", null, "Owner", "owner1@eventbrite.com", "Owner1", "LastName", "O1", "Owner1", null, null, 555555555, "Owner", null, "8dc73db1-9657-45b1-8773-63009fc2e941" });

            migrationBuilder.CreateIndex(
                name: "IX_Books_AuthorId",
                table: "Books",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsPlans_PlanId",
                table: "ClientsPlans",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsTrainers_TrainerId",
                table: "ClientsTrainers",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_CategoryId",
                table: "Exercises",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_PlanId",
                table: "Exercises",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ClientUserId",
                table: "Plans",
                column: "ClientUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_OrganizationId",
                table: "Plans",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_TrainerUserId",
                table: "Plans",
                column: "TrainerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganizationId",
                table: "Users",
                column: "OrganizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "ClientsPlans");

            migrationBuilder.DropTable(
                name: "ClientsTrainers");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Authors");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Organizations");
        }
    }
}
