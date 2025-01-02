
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
├── 📂 prisma
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
│   │   │   └── 📄 migration.sql
│   │   └── 📄 migration_lock.toml <------- Izvsene ispravke nad bazom
│   └── 📄 schema.prisma <------- Schema nase baze
├── 📂 public <------- Data za testiranje uplaod i prikaz podataka
│   └── 📂 data
│       ├── 📄 DHL.xlsx
│       ├── 📄 DHL2.xlsx
│       ├── 📄 hellmann.xlsx
│       ├── 📄 hellmann2.xlsx
│       └── 📄 logwin.xlsx
└── 📂 src
    ├── 📂 app <------- Root folder aplikacije
    │   ├── 📂 api
    │   │   ├── 📂 auth
    │   │   │   ├── 📂 register
    │   │   │   │   └── 📄 route.ts <------- Backend Server Side za register
    │   │   │   └── 📂 [...nextauth]
    │   │   │       └── 📄 route.ts <------- NextAuth & Prisma login
    │   │   └── 📂 shipments
    │   │       ├── 📂 upload
    │   │       │   └── 📄 route.ts <------- Backend za stranicu upload sa admin restrikcijom
    │   │       └── 📂 [id]
    │   │           └── 📄 route.ts <------- Backend Delete Shipment za stranicu pocetnu sa admin restrikcijom
    │   ├── 📂 auth
    │   │   ├── 📂 login
    │   │   │   └── 📄 page.tsx <------- Login stranica
    │   │   └── 📂 register
    │   │       └── 📄 page.tsx <------- Register stranica
    │   ├── 📄 favicon.ico
    │   ├── 📄 globals.css <------- Dark & Light theme konfigurisane ovde
    │   ├── 📄 layout.tsx <------- Root layout
    │   ├── 📄 page.tsx
    │   ├── 📄 providers.tsx <------- NextAuth Session Provider
    │   ├── 📂 shipments
    │   │   ├── 📄 columns.tsx <------- Mapiranje date prema ShadCn tabeli
    │   │   ├── 📄 loading.tsx <------- Loading skeleton
    │   │   ├── 📄 page.tsx <------- Stranica shipments, pocetna
    │   │   ├── 📂 upload
    │   │   │   └── 📄 page.tsx <------- Stranica upload
    │   │   └── 📂 [id]
    │   │       ├── 📄 columns.tsx <------- Mapiranje date po karticama i obradjivanje date
    │   │       ├── 📄 loading.tsx <------- Loading skeleton
    │   │       └── 📄 page.tsx <------- Redirect stranica sa shipments
    │   ├── 📂 types
    │   │   └── 📄 next-auth.d.ts <------- Prosireni interfejsi za auth zbog rola
    │   └── 📂 utils
    │       ├── 📄 carrierMappings.ts <------- Izbor tipa mapiranja
    │       └── 📄 formatters.ts <------- Funkcije za display datuma i stringovanje
    ├── 📂 components
    │   ├── 📂 auth
    │   │   ├── 📄 AuthCard.tsx <------- Komponenta za card login/register
    │   │   └── 📄 AuthForm.tsx <------- Komponenta za polja login/register
    │   ├── 📄 DropDownMenu.tsx <------- Komponenta za Properties (ViewShipmentDetails & DeleteShipment)
    │   ├── 📄 LoadSpinner.tsx <------- Komponenta za loading krug
    │   ├── 📄 Navbar.tsx <------- Komponenta za navbar
    │   ├── 📄 PopUp.tsx <------- Komponenta modal tipa
    │   ├── 📄 SearchComp.tsx <------- Komponenta za pretragu query
    │   ├── 📂 shipdetails
    │   │   ├── 📄 InfoCard.tsx <------- Komponenta card tipa za prikaz polja sa ikonicama na ship details stranici
    │   │   ├── 📄 ShipmentHeader.tsx <------- Komponenta za header ship details stranice
    │   │   └── 📄 ShipmentTimeline.tsx <------- Komponenta za prikaz vremenskih desavanja
    │   ├── 📄 SkeletonWrapper.tsx <------- Komponenta za skeletone
    │   ├── 📂 table
    │   │   ├── 📄 DataTable.tsx <------- Komponenta za prikazivanje body tabela
    │   │   ├── 📄 DataTableColumnHeader.tsx <------- Komponenta za prikazivanje head tabela
    │   │   ├── 📄 DataTablePagination.tsx <------- Komponenta za paginaciju tabela
    │   │   └── 📄 DataTableViewOptions.tsx <------- Komponenta za filtriranje kolona tabela
    │   ├── 📄 ThemeSwitcherBtn.tsx <------- Komponenta menjanje dark/system/light theme
    │   ├── 📄 UploadLink.tsx <------- Komponenta za upload admin/user role
    │   └── 📂 ui <------- Shadcn/ui komponente
    │       ├── 📄 accordion.tsx
    │       ├── 📄 alert-dialog.tsx
    │       ├── 📄 alert.tsx
    │       ├── 📄 aspect-ratio.tsx
    │       ├── 📄 avatar.tsx
    │       ├── 📄 badge.tsx
    │       ├── 📄 breadcrumb.tsx
    │       ├── 📄 button.tsx
    │       ├── 📄 card.tsx
    │       ├── 📄 checkbox.tsx
    │       ├── 📄 dialog.tsx
    │       ├── 📄 dropdown-menu.tsx
    │       ├── 📄 input.tsx
    │       ├── 📄 label.tsx
    │       ├── 📄 pagination.tsx
    │       ├── 📄 scroll-area.tsx
    │       ├── 📄 select.tsx
    │       ├── 📄 separator.tsx
    │       ├── 📄 skeleton.tsx
    │       ├── 📄 table.tsx
    │       ├── 📄 toast.tsx
    │       ├── 📄 toaster.tsx
    │       ├── 📄 use-notifications.ts
    │       └── 📄 use-toast.ts
    ├── 📂 lib
    │   ├── 📄 prisma.ts <------- Prisma Client util
    │   ├── 📄 action.ts <------- Search prisma findmany util
    │   └── 📄 utils.ts <------- Shadcn util
    └── 📄 middleware.ts <------- Blokator stranica bez auth-a i autorizacija

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

