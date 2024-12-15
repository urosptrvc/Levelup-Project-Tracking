
# Levelup Tracking Mapping Project

Ova aplikacija omogućava korisnicima da učitavaju XLSX fajlove koji sadrže podatke o pošiljkama od različitih kurirskih službi (DHL, Hellmann, Logwin). Aplikacija automatski obrađuje i prikazuje podatke u preglednom korisničkom interfejsu.


## Glavne funkcionalnosti

- Učitavanje XLSX fajlova: Korisnici mogu upload-ovati fajlove.
- Obrada podataka: Aplikacija obrađuje podatke koristeći prilagođene mapiranja za različite kurirske službe.
- Prikaz podataka: Podaci se prikazuju u tabelarnom obliku sa mogućnostima paginacije i pretrage.

## Tehnologije korišćene

 - Next.js – Framework za izradu React aplikacija.
 - TypeScript – Tipiziran JavaScript za sigurniji kod.
 - Tailwind CSS – Stilizovanje korisničkog interfejsa.
 - Shadcn/ui – Stilizovanje korisničkog interfejsa & reusable komponente.
 - Prisma – ORM alat za rad sa bazama podataka.
 - XLSX.js – Biblioteka za obradu Excel fajlova.
 - API rute – Backend servisi za učitavanje i obradu podataka.


## Instalacija i pokretanje projekta

Kloniranje repozitorijuma:

```bash
  git clone https://github.com/urosptrvc/Levelup-Project-Tracking
  cd Levelup-Project-Tracking
```

Instalirajte dependencies:

```bash
  npm install
```

Podešavanje okruženja:

Kreirajte .env fajl u root projekta

```bash
  DATABASE_URL="mysql://user:password@localhost:3306/levelup_db"
```

Napravite MySQL database koji ce se zvati levelup_db, zatim pokrenite prisma migraciju koja ce ubaciti entitet i  potrebne atrubute.

```bash
  npx prisma migrate deploy
```

Pokrenite aplikaciju:

```bash
  npm run dev
```
U public folderu se nalazi data folder sa neophodnih .xlsx fajlovima za testiranje.
## Struktura projekta
```bash

├── 📂 prisma <------- ORM za handlovanje database i entiteta
│   ├── 📂 migrations
│   │   ├── 📂 20241213224749_change_id_to_string
│   │   │   └── 📄 migration.sql <------- Izvsene ispavke i promene za bazu
│   │   ├── 📂 20241213225731_carrier_type
│   │   │   └── 📄 migration.sql <------- Izvsene ispavke i promene za bazu
│   │   ├── 📂 20241213233316_carrier_underscore_type
│   │   │   └── 📄 migration.sql <------- Izvsene ispavke i promene za bazu
│   │   ├── 📂 20241214033557_weightandvolume_stringify
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241215172432_filename
│   │   │   └── 📄 migration.sql <------- Izvsene ispavke i promene za bazu
│   │   ├── 📂 20241215181217_varchar
│   │   │   └── 📄 migration.sql <------- Izvsene ispavke i promene za bazu
│   │   └── 📄 migration_lock.toml
│   └── 📄 schema.prisma <------- Schema nase baze, ovde mozemo menjati samu bazu
├── 📂 public
│   ├── 📂 data <------- Data za testiranje
│   │   ├── 📄 DHL.xlsx
│   │   ├── 📄 DHL2.xlsx
│   │   ├── 📄 hellmann.xlsx
│   │   ├── 📄 hellmann2.xlsx
│   │   └── 📄 logwin.xlsx
│   ├── 📄 file.svg
│   ├── 📄 globe.svg
│   ├── 📄 next.svg
│   ├── 📄 vercel.svg
│   └── 📄 window.svg
└── 📂 src
    ├── 📂 app <------- Root folder nase aplikacije
    │   ├── 📂 api
    │   │   └── 📂 shipments
    │   │       ├── 📄 route.ts <------- Backend Server Side za stranicu shipments
    │   │       └── 📂 upload
    │   │           └── 📄 route.ts <------- Backend Server Side za stranicu upload
    │   ├── 📄 favicon.ico
    │   ├── 📄 globals.css
    │   ├── 📄 layout.tsx <------- Sloj koji obuhvata sve stranice nase aplikacije
    │   ├── 📄 page.tsx <------- Main page, preusmeren na /shipments
    │   ├── 📂 shipments
    │   │   ├── 📄 page.tsx <------- Stranica shipments, pocetna
    │   │   ├── 📂 upload
    │   │   │   └── 📄 page.tsx <------- Stranica upload, gde vrsimo upload 
    │   │   └── 📂 [id]
    │   │       └── 📄 page.tsx <------- Redirect stranica sa shipments
    │   └── 📂 types
    │       └── 📄 carrierMappings.ts <------- Mapiranje u zavisnosti koji je carrier
    ├── 📂 components 
    │   ├── 📄 Input.tsx <------- Komponenta za search
    │   ├── 📄 PaginationComponent.tsx <------- Komponenta za Paginaciju
    │   ├── 📄 TableHeaders.tsx <------- Komponenta za zaglavlje tabele
    │   ├── 📄 TableRows.tsx <------- Komponenta za redove tabele
    │   └── 📂 ui <------- Re-usable komponente, koriscen Shadcn/ui
    │       ├── 📄 button.tsx
    │       ├── 📄 card.tsx
    │       ├── 📄 input.tsx
    │       ├── 📄 pagination.tsx
    │       ├── 📄 table.tsx
    │       ├── 📄 toast.tsx
    │       ├── 📄 toaster.tsx
    │       ├── 📄 use-notifications.ts
    │       └── 📄 use-toast.ts
    └── 📂 lib
        ├── 📄 prisma.ts <------- Prisma Client util
        └── 📄 utils.ts <------- XLSX utils

Total directories 📂: 22
Total files 📄: 43

File extensions count:
.sql : 6
.toml : 1
.prisma : 1
.xlsx : 5
.svg : 5
.ts : 7
.ico : 1
.css : 1
.tsx : 16
```

## Dokumentacija i proces razmisljanja

[Dokumentacija](https://github.com/urosptrvc/Levelup-Project-Tracking/blob/master/Dokumentacija.pdf)

