	
-- Inserts
INSERT INTO Ricks(Name,Description) VALUES('Rick Sanchez','O Rick do seriado');
INSERT INTO Mortys(Name,Description,RickId) VALUES('Morty Smith','O Morty do seriado',1);
INSERT INTO Dimensions(Codigo,RickId,MortyId) VALUES('C137',1,1);
INSERT INTO Ricks(Name,Description) VALUES('Rick Flanders','O Rick generico');

-- dotnet ef --startup-project ../RickLocalization.WebApi migrations script

CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

CREATE TABLE "Ricks" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Ricks" PRIMARY KEY AUTOINCREMENT,
    "Name" varchar(100) NOT NULL,
    "Description" varchar(255) NULL,
    "Image" TEXT NULL,
    "QI" INTEGER NOT NULL
);

CREATE TABLE "Dimensions" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Dimensions" PRIMARY KEY AUTOINCREMENT,
    "Code" varchar(4) NULL,
    "TravelDate" TEXT NOT NULL,
    "RickId" INTEGER NOT NULL,
    CONSTRAINT "FK_Dimensions_Ricks_RickId" FOREIGN KEY ("RickId") REFERENCES "Ricks" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Mortys" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Mortys" PRIMARY KEY AUTOINCREMENT,
    "Name" varchar(100) NOT NULL,
    "Description" varchar(255) NULL,
    "Image" TEXT NULL,
    "RickId" INTEGER NOT NULL,
    CONSTRAINT "FK_Mortys_Ricks_RickId" FOREIGN KEY ("RickId") REFERENCES "Ricks" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Dimensions_RickId" ON "Dimensions" ("RickId");

CREATE UNIQUE INDEX "IX_Mortys_RickId" ON "Mortys" ("RickId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210723234524_rickmigration', '3.1.0');