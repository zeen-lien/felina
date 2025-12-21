# Bagian 5 - Perancangan UML (40 poin)

## Pengantar

Unified Modeling Language (UML) adalah bahasa pemodelan standar untuk visualisasi, spesifikasi, konstruksi, dan dokumentasi sistem perangkat lunak. Untuk sistem FabricFlow, UML digunakan untuk memodelkan interaksi user, alur proses bisnis, struktur class, dan komunikasi antar objek.

---

## A. Use Case Diagram (10 poin)

### Deskripsi
Use Case Diagram menggambarkan interaksi antara aktor (user) dengan sistem, menunjukkan fungsionalitas yang dapat dilakukan oleh setiap aktor.

### Aktor:
1. **Admin** - Pengelola sistem dengan akses penuh
2. **Kasir** - Operator POS dengan akses terbatas

### Use Cases:

#### Use Cases Admin (Full Access):
1. Login - Autentikasi ke sistem
2. Logout - Keluar dari sistem
3. Kelola Produk - CRUD produk kain
4. Kelola Stok - Adjustment stok masuk/keluar
5. Lihat Dashboard - Monitoring KPI real-time
6. Lihat Laporan - Analisis penjualan & stok
7. Kelola User - CRUD user (kasir/admin)
8. Lihat Audit Log - Tracking aktivitas user
9. Proses Transaksi - Melakukan penjualan (POS)
10. Catat Kain Rusak - Input kain rusak/cacat
11. Lihat Transaksi - Riwayat transaksi
12. Void Transaksi - Batalkan transaksi

#### Use Cases Kasir (Limited Access):
1. Login - Autentikasi ke sistem
2. Logout - Keluar dari sistem
3. Proses Transaksi - Melakukan penjualan (POS)
4. Catat Kain Rusak - Input kain rusak/cacat
5. Lihat Transaksi - Riwayat transaksi (read-only)
6. Lihat Dashboard - Monitoring KPI (limited)

### Relasi Use Case:
- **<<include>>**: Login harus dilakukan sebelum use case lain
- **<<extend>>**: Void Transaksi extends Lihat Transaksi (optional)

### Script Diagram - PlantUML

```plantuml
@startuml
skinparam backgroundColor #FFFFFF
skinparam defaultFontColor #000000
skinparam shadowing false
skinparam ArrowColor #000000

skinparam actor {
    BackgroundColor #E3F2FD
    BorderColor #1976D2
    BorderThickness 2
}

skinparam usecase {
    BackgroundColor #FFF3E0
    BorderColor #F57C00
    BorderThickness 2
}

skinparam rectangle {
    BackgroundColor #F5F5F5
    BorderColor #424242
    BorderThickness 2
}

title Use Case Diagram - Sistem FabricFlow

left to right direction

actor "Admin" as admin
actor "Kasir" as kasir

rectangle "SISTEM FABRICFLOW" {
  
  usecase "UC1: Login" as UC1
  usecase "UC2: Logout" as UC2
  usecase "UC3: Kelola Produk" as UC3
  usecase "UC4: Kelola Stok" as UC4
  usecase "UC5: Catat Kain Rusak" as UC5
  usecase "UC6: Proses Transaksi (POS)" as UC6
  usecase "UC7: Lihat Transaksi" as UC7
  usecase "UC8: Void Transaksi" as UC8
  usecase "UC9: Lihat Dashboard" as UC9
  usecase "UC10: Lihat Laporan" as UC10
  usecase "UC11: Kelola User" as UC11
  usecase "UC12: Lihat Audit Log" as UC12
}

' Admin connections
admin --> UC1
admin --> UC2
admin --> UC3
admin --> UC4
admin --> UC5
admin --> UC6
admin --> UC7
admin --> UC8
admin --> UC9
admin --> UC10
admin --> UC11
admin --> UC12

' Kasir connections
kasir --> UC1
kasir --> UC2
kasir --> UC5
kasir --> UC6
kasir --> UC7
kasir --> UC9

' Include relationships
UC3 ..> UC1 : <<include>>
UC4 ..> UC1 : <<include>>
UC5 ..> UC1 : <<include>>
UC6 ..> UC1 : <<include>>
UC7 ..> UC1 : <<include>>
UC9 ..> UC1 : <<include>>
UC10 ..> UC1 : <<include>>
UC11 ..> UC1 : <<include>>
UC12 ..> UC1 : <<include>>

' Extend relationships
UC8 ..> UC7 : <<extend>>

note right of UC8
  Hanya Admin yang
  bisa void transaksi
end note

@enduml
```

**Cara Generate Gambar:**
1. Copy script PlantUML di atas
2. Buka https://www.plantuml.com/plantuml/uml/
3. Paste script ke editor
4. Klik "Submit" untuk generate
5. Download gambar PNG
6. Paste ke Word

---

## B. Activity Diagram (10 poin)

### Deskripsi
Activity Diagram menggambarkan alur aktivitas proses bisnis dari awal hingga akhir, termasuk decision point dan parallel activities.

### Proses: Transaksi Penjualan (POS)

### Script Diagram - PlantUML

```plantuml
@startuml
skinparam backgroundColor #FFFFFF
skinparam defaultFontColor #000000
skinparam shadowing false
skinparam ArrowColor #000000

skinparam activity {
    BackgroundColor #E3F2FD
    BorderColor #1976D2
    BorderThickness 2
    DiamondBackgroundColor #FFF3E0
    DiamondBorderColor #F57C00
    StartColor #4CAF50
    EndColor #F44336
}

title Activity Diagram - Proses Transaksi POS

|Kasir|
start
:Buka Halaman Kasir;
:Lihat Daftar Produk;

repeat
  :Cari/Pilih Produk;
  :Input Jumlah (meter);
  :Klik "Tambah ke Keranjang";
  
  |Sistem|
  if (Stok Tersedia?) then (Ya)
    :Tambah Item ke Keranjang;
    :Update Tampilan Keranjang;
    |Kasir|
    :Lihat Item di Keranjang;
  else (Tidak)
    :Tampilkan Error\n"Stok Tidak Cukup";
    |Kasir|
  endif
  
repeat while (Tambah Produk Lain?) is (Ya)
->Tidak;

if (Keranjang Kosong?) then (Ya)
  :Tampilkan Error\n"Keranjang Kosong";
  stop
else (Tidak)
  :Input Diskon (Optional);
  :Pilih Metode Pembayaran;
  note right
    Metode: Tunai, Transfer,
    QRIS, Kartu Kredit
  end note
  
  :Klik "Proses Transaksi";
  
  |Sistem|
  :Generate Nomor Transaksi;
  :Hitung Grand Total;
  
  fork
    :Simpan Data Transaksi;
  fork again
    :Update Stok Produk;
  fork again
    :Catat ke Stok Log;
  fork again
    :Catat ke Audit Log;
  end fork
  
  :Generate Struk Digital;
  :Kosongkan Keranjang;
  :Tampilkan Modal Struk;
  
  |Kasir|
  :Lihat Struk Transaksi;
  :Klik "Selesai";
  
  |Sistem|
  :Tutup Modal;
  :Kembali ke Halaman Kasir;
endif

stop

@enduml
```

**Cara Generate Gambar:**
1. Copy script PlantUML di atas
2. Buka https://www.plantuml.com/plantuml/uml/
3. Paste script ke editor
4. Klik "Submit" untuk generate
5. Download gambar PNG
6. Paste ke Word

### Penjelasan Alur:

**Fase 1: Persiapan**
- Kasir membuka halaman POS
- Sistem menampilkan daftar produk

**Fase 2: Pemilihan Produk (Loop)**
- Kasir memilih produk dan input jumlah
- Sistem validasi stok
- Jika stok cukup → tambah ke keranjang
- Loop berlanjut sampai selesai

**Fase 3: Konfigurasi Transaksi**
- Kasir input diskon (optional)
- Kasir pilih metode pembayaran

**Fase 4: Pemrosesan (Parallel)**
- Simpan transaksi
- Update stok produk
- Catat stok log
- Catat audit log

**Fase 5: Penyelesaian**
- Generate struk digital
- Tampilkan modal struk
- Kasir review dan selesai

---

## C. Class Diagram (10 poin)

### Deskripsi
Class Diagram menggambarkan struktur class dalam sistem, termasuk atribut, method, dan relasi antar class.

### Class-Class Utama:

1. **AuthStore** - Manajemen autentikasi
2. **ProdukStore** - Manajemen produk
3. **TransaksiStore** - Manajemen transaksi
4. **Pengguna** - Entity user
5. **Produk** - Entity produk
6. **Transaksi** - Entity transaksi
7. **ItemTransaksi** - Entity item transaksi

### Script Diagram - PlantUML

```plantuml
@startuml
skinparam backgroundColor #FFFFFF
skinparam defaultFontColor #000000
skinparam shadowing false
skinparam linetype ortho

skinparam class {
    BackgroundColor #E3F2FD
    BorderColor #1976D2
    BorderThickness 2
    ArrowColor #000000
}

title Class Diagram - Sistem FabricFlow

' Entity Classes
class Pengguna {
  - id: string
  - nama: string
  - email: string
  - password: string
  - peran: string
  - aktif: boolean
  - fotoProfil: string
  - tanggalDibuat: Date
}

class Produk {
  - id: string
  - kode: string
  - nama: string
  - kategori: string
  - warna: string
  - harga: number
  - stok: number
  - satuan: string
  - foto: string
  - deskripsi: string
  - tanggalDibuat: Date
}

class Transaksi {
  - id: string
  - nomor: string
  - tanggal: Date
  - penggunaId: string
  - namaPengguna: string
  - items: ItemTransaksi[]
  - total: number
  - diskon: number
  - grandTotal: number
  - metodeBayar: string
  - status: string
  - catatan: string
}

class ItemTransaksi {
  - produkId: string
  - namaProduk: string
  - jumlah: number
  - hargaSatuan: number
  - subtotal: number
}

' Store Classes
class AuthStore <<Zustand>> {
  - pengguna: Pengguna
  - sudahLogin: boolean
  - sedangMemuat: boolean
  + login(email, password): object
  + logout(): void
  + adalahAdmin(): boolean
  + adalahKasir(): boolean
}

class ProdukStore <<Zustand>> {
  - daftarProduk: Produk[]
  - sedangMemuat: boolean
  + muatProduk(): void
  + tambahProduk(data): object
  + updateProduk(id, data): object
  + hapusProduk(id): object
  + cariProdukById(id): Produk
  + updateStok(id, jumlah): object
}

class TransaksiStore <<Zustand>> {
  - daftarTransaksi: Transaksi[]
  - keranjang: ItemTransaksi[]
  - diskon: number
  - metodeBayar: string
  + muatTransaksi(): void
  + prosesTransaksi(pengguna): object
  + voidTransaksi(id): object
  + tambahKeKeranjang(produk, jumlah): void
  + updateJumlahKeranjang(id, jumlah): void
  + hapusDariKeranjang(id): void
  + kosongkanKeranjang(): void
  + hitungTotal(): object
}

' Relationships
AuthStore "1" --> "0..1" Pengguna : manages
ProdukStore "1" --> "*" Produk : manages
TransaksiStore "1" --> "*" Transaksi : manages
TransaksiStore "1" --> "*" ItemTransaksi : manages cart
Transaksi "1" *-- "*" ItemTransaksi : contains
Transaksi "*" --> "1" Pengguna : created by
ItemTransaksi "*" --> "1" Produk : references
TransaksiStore ..> ProdukStore : uses
TransaksiStore ..> AuthStore : uses

@enduml
```

**Cara Generate Gambar:**
1. Copy script PlantUML di atas
2. Buka https://www.plantuml.com/plantuml/uml/
3. Paste script ke editor
4. Klik "Submit" untuk generate
5. Download gambar PNG
6. Paste ke Word

### Penjelasan Class:

**Entity Classes:**
- **Pengguna** - Data user (Admin/Kasir)
- **Produk** - Data produk kain
- **Transaksi** - Data transaksi penjualan
- **ItemTransaksi** - Detail item dalam transaksi

**Store Classes (State Management):**
- **AuthStore** - Autentikasi dan session
- **ProdukStore** - CRUD produk dan stok
- **TransaksiStore** - Keranjang POS dan transaksi

**Relasi:**
- **Composition** (strong): Transaksi *contains* ItemTransaksi
- **Association** (weak): Transaksi references Pengguna
- **Dependency**: TransaksiStore uses ProdukStore & AuthStore

---

## D. Sequence Diagram (10 poin)

### Deskripsi
Sequence Diagram menggambarkan interaksi antar objek dalam urutan waktu tertentu.

### Proses: Transaksi Penjualan (POS)

### Script Diagram - PlantUML

```plantuml
@startuml
skinparam backgroundColor #FFFFFF
skinparam defaultFontColor #000000
skinparam shadowing false

skinparam actor {
    BackgroundColor #E3F2FD
    BorderColor #1976D2
}

skinparam participant {
    BackgroundColor #FFF3E0
    BorderColor #F57C00
}

skinparam database {
    BackgroundColor #F1F8E9
    BorderColor #558B2F
}

title Sequence Diagram - Proses Transaksi POS

actor Kasir as kasir
participant "UI\n(Kasir.jsx)" as ui
participant "TransaksiStore" as ts
participant "ProdukStore" as ps
participant "AuthStore" as as
database "localStorage" as db

== Fase 1: Inisialisasi ==
kasir -> ui : Buka Halaman Kasir
activate ui
ui -> ps : muatProduk()
activate ps
ps -> db : ambilDariStorage('produk')
db --> ps : daftarProduk[]
ps --> ui : daftarProduk[]
deactivate ps
ui --> kasir : Tampilkan Daftar Produk
deactivate ui

== Fase 2: Tambah ke Keranjang ==
kasir -> ui : Pilih Produk & Input Jumlah
activate ui
kasir -> ui : Klik "Tambah ke Keranjang"
ui -> ts : tambahKeKeranjang(produk, jumlah)
activate ts
ts -> ts : Validasi & Update Keranjang
ts --> ui : Keranjang Updated
deactivate ts
ui --> kasir : Tampilkan Item di Keranjang
deactivate ui

note right of kasir
  Loop: Kasir dapat
  menambah produk lain
end note

== Fase 3: Konfigurasi ==
kasir -> ui : Input Diskon & Pilih Metode
activate ui
ui -> ts : setDiskon(nominal)
ui -> ts : setMetodeBayar(metode)
ui --> kasir : Tampilkan Total
deactivate ui

== Fase 4: Proses Transaksi ==
kasir -> ui : Klik "Proses Transaksi"
activate ui
ui -> ui : Validasi Keranjang
ui -> ts : prosesTransaksi(pengguna)
activate ts
ts -> as : get pengguna
as --> ts : pengguna
ts -> ts : Generate ID & Nomor
ts -> ts : Hitung Total
ts -> db : simpanKeStorage('transaksi')
db --> ts : Success
ts --> ui : {sukses: true, transaksi}
deactivate ts

== Fase 5: Update Stok ==
ui -> ps : updateStok(produkId, -jumlah)
activate ps
loop Untuk Setiap Item
    ps -> ps : Kurangi Stok
    ps -> db : simpanKeStorage('produk')
end
ps --> ui : Stok Updated
deactivate ps

== Fase 6: Finalisasi ==
ui -> ts : kosongkanKeranjang()
ui -> ui : Generate Struk
ui --> kasir : Tampilkan Struk
kasir -> ui : Klik "Selesai"
ui --> kasir : Kembali ke Halaman Kasir
deactivate ui

@enduml
```

**Cara Generate Gambar:**
1. Copy script PlantUML di atas
2. Buka https://www.plantuml.com/plantuml/uml/
3. Paste script ke editor
4. Klik "Submit" untuk generate
5. Download gambar PNG
6. Paste ke Word

### Penjelasan Sequence:

**Fase 1: Inisialisasi**
- Kasir buka halaman POS
- UI load data produk dari storage
- Tampilkan daftar produk

**Fase 2: Tambah ke Keranjang (Loop)**
- Kasir pilih produk dan input jumlah
- UI tambah ke keranjang via TransaksiStore
- Tampilkan keranjang terupdate

**Fase 3: Konfigurasi**
- Kasir input diskon (optional)
- Kasir pilih metode pembayaran
- UI tampilkan total

**Fase 4: Proses Transaksi**
- Kasir klik "Proses Transaksi"
- UI validasi keranjang
- TransaksiStore generate transaksi
- Simpan ke localStorage

**Fase 5: Update Stok**
- UI update stok via ProdukStore
- Loop untuk setiap item
- Simpan perubahan stok

**Fase 6: Finalisasi**
- Kosongkan keranjang
- Generate struk digital
- Tampilkan struk ke kasir
- Selesai

---

## Kesimpulan Bagian 5

Bagian 5 telah menyelesaikan seluruh requirement UML diagram:

✅ **A. Use Case Diagram (10 poin)**
- 12 use cases lengkap
- 2 aktor (Admin & Kasir)
- Relasi include & extend

✅ **B. Activity Diagram (10 poin)**
- Alur proses transaksi POS lengkap
- Decision points dan parallel activities
- Loop untuk tambah produk

✅ **C. Class Diagram (10 poin)**
- 7 class (4 entity + 3 store)
- Atribut dan method dari code asli
- Relasi composition, association, dependency

✅ **D. Sequence Diagram (10 poin)**
- 6 fase proses transaksi
- Interaksi antar objek detail
- Message passing lengkap

**Total: 40 poin** ✅

Semua diagram menggunakan PlantUML dengan background putih, cocok untuk print dan paste ke Word/PDF.

**File Implementasi:**
- `authStore.js` - AuthStore
- `produkStore.js` - ProdukStore
- `transaksiStore.js` - TransaksiStore
- `Kasir.jsx` - UI Component
- `helper.js` - Utility functions

