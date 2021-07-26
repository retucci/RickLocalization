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
    "Original" INTEGER NOT NULL,
    "Code" varchar(4) NOT NULL,
    "TravelDate" DateTime NOT NULL,
    "RickId" INTEGER NOT NULL,
    CONSTRAINT "FK_Dimensions_Ricks_RickId" FOREIGN KEY ("RickId") REFERENCES "Ricks" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Mortys" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Mortys" PRIMARY KEY AUTOINCREMENT,
    "Name" varchar(100) NOT NULL,
    "Description" varchar(255) NULL,
    "RickId" INTEGER NOT NULL,
    CONSTRAINT "FK_Mortys_Ricks_RickId" FOREIGN KEY ("RickId") REFERENCES "Ricks" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Dimensions_RickId" ON "Dimensions" ("RickId");

CREATE UNIQUE INDEX "IX_Mortys_RickId" ON "Mortys" ("RickId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20210726021247_RickLocalizationMigration', '3.1.0');