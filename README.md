
# Levelup Tracking Mapping Project

Ova aplikacija omogućava korisnicima da učitavaju XLSX fajlove koji sadrže podatke o pošiljkama od različitih kurirskih službi (DHL, Hellmann, Logwin). Aplikacija automatski obrađuje i prikazuje podatke u preglednom korisničkom interfejsu.


## Glavne funkcionalnosti

- Učitavanje XLSX fajlova: Korisnici mogu upload-ovati fajlove.
- Obrada podataka: Aplikacija obrađuje podatke koristeći prilagođene mapiranja za različite kurirske službe.
- Prikaz podataka: Podaci se prikazuju u tabelarnom obliku sa mogućnostima paginacije i pretrage.
- Mogućnost odabira role pri registraciji (User/Admin), User nema mogućstvo upload i brisanja fajlova.
- 
## Tehnologije korišćene

 - Next.js – Framework za izradu React aplikacija.
 - NextAuth - U kombinaciji sa Prismom za auth usera.
 - TypeScript – Tipiziran JavaScript za sigurniji kod.
 - Tailwind CSS – Stilizovanje korisničkog interfejsa.
 - Shadcn/ui – Stilizovanje korisničkog interfejsa & reusable komponente.
 - Prisma – ORM alat za rad sa bazama podataka.
 - XLSX.js – Biblioteka za obradu Excel fajlova.
 - API rute – Backend servisi za učitavanje i obradu podataka.
 - TanStack Query - Query za get, Mutacije za delete-post-update na client komponentama.

## Instalacija i pokretanje projekta

Kloniranje repozitorijuma:

```bash
  git clone <https://github.com/urosptrvc/Levelup-Project-Tracking>
  cd <ime_foldera>
```

Instalirajte dependencies:

```bash
  npm install
```

Podešavanje okruženja:

Kreirajte .env fajl u root projekta

```bash
  DATABASE_URL="mysql://user:password@localhost:3306/levelup_db"
  NEXTAUTH_SECRET="jaka_sifra"
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

## PDF Dokumentacija

[GitDokumentacija](https://github.com/urosptrvc/Levelup-Project-Tracking/blob/master/Dokumentacija.pdf) ili [OnlineDokumentacija](https://pdfupload.io/docs/2ebf6b9b)

## Struktura projekta
```bash

├── 📂 prisma <------- ORM za handlovanje database i entiteta
│   ├── 📂 migrations
│   │   ├── 📂 20241213224749_change_id_to_string
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241213225731_carrier_type
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241213233316_carrier_underscore_type
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241214033557_weightandvolume_stringify
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241215172432_filename
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241215181217_varchar
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241226163312_
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241227014838_typesupdates
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20241227015243_
│   │   │   └── 📄 migration.sql <------- Izvsene ispravke nad bazom
│   │   └── 📄 migration_lock.toml
│   └── 📄 schema.prisma <------- Schema nase baze
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
    │   │   ├── 📂 auth
    │   │   │   ├── 📂 register
    │   │   │   │   └── 📄 route.ts <------- Backend Server Side za register
    │   │   │   └── 📂 [...nextauth]
    │   │   │       └── 📄 route.ts <------- NextAuth & Prisma login
    │   │   └── 📂 shipments
    │   │       ├── 📄 route.ts <------- Backend Server Side za stranicu shipments
    │   │       └── 📂 upload
    │   │           └── 📄 route.ts <------- Backend Server Side za stranicu upload
    │   ├── 📂 auth
    │   │   ├── 📂 login
    │   │   │   └── 📄 page.tsx <------- Login stranica
    │   │   └── 📂 register
    │   │       └── 📄 page.tsx <------- Register stranica
    │   ├── 📂 types
    │   │   ├── 📄 carrierMappings.ts <------- Izbor tipa mapiranja
    │   │   └── 📄 formatters.ts <------- Funkcija za display datuma i stringovanje
    │   ├── 📄 favicon.ico
    │   ├── 📄 globals.css
    │   ├── 📄 layout.tsx
    │   ├── 📄 page.tsx
    │   ├── 📄 providers.tsx <------- NextAuth Session Provider
    │   ├── 📂 shipments
    │   │   ├── 📄 page.tsx <------- Stranica shipments, pocetna
    │   │   ├── 📂 upload
    │   │   │   └── 📄 page.tsx <------- Stranica upload, gde vrsimo upload 
    │   │   └── 📂 [id]
    │   │       ├── 📄 loading.tsx <------- Skeleton pri ucitavanju page.tsx
    │   │       └── 📄 page.tsx <------- Redirect stranica sa shipments
    │   └── 📂 types
    │       └── 📄 next-auth.d.ts <------- Prosireni interfejsi za auth zbog rola
    ├── 📂 components
    │   ├── 📄 AuthCard.tsx <------- Komponenta za card login/register
    │   ├── 📄 AuthForm.tsx <------- Komponenta za polja login/register
    │   ├── 📄 Navbar.tsx <------- Komponenta za navbar
    │   ├── 📄 SkeletonWrapper.tsx <------- Komponenta za skeletone
    │   ├── 📄 DataTable.tsx <------- Komponenta za prikazivanje tabela
    │   ├── 📄 PaginationComponent.tsx <------- Komponenta za paginaciju
    │   ├── 📄 UploadLink.tsx <------- Komponenta za upload admin/user role
    │   ├── 📄 ThemeSwitcherBtn.tsx <------- Dropdown komponenta za switch theme
    │   ├── 📄 LoadSpinner.tsx <------- Loading animacija
    │   ├── 📂 ui <------- Shadcn/ui komponente
    │   │   ├── 📄 button.tsx
    │   │   ├── 📄 card.tsx
    │   │   ├── 📄 dialog.tsx
    │   │   ├── 📄 input.tsx
    │   │   ├── 📄 pagination.tsx
    │   │   ├── 📄 select.tsx
    │   │   ├── 📄 skeleton.tsx
    │   │   ├── 📄 table.tsx
    │   │   ├── 📄 toast.tsx
    │   │   ├── 📄 toaster.tsx
    │   │   ├── 📄 use-notifications.ts
    │   │   └── 📄 use-toast.ts
    ├── 📂 lib
    │   ├── 📄 prisma.ts <------- Prisma Client util
    │   ├── 📄 action.ts <------- Search prisma getmany util
    │   └── 📄 utils.ts <------- Shadcn util
    └── 📄 middleware.ts <------- Blokator stranica bez auth-a

Total directories 📂: 36
Total files 📄: 87

File extensions count:
.sql : 9
.toml : 1
.prisma : 1
.xlsx : 5
.svg : 5
.ts : 13
.tsx : 51
.ico : 1
.css : 1
```

