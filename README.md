# 🧵 FabricFlow

> Sistem Aplikasi Web untuk Digitalisasi Operasional Toko Kain

[![Status](https://img.shields.io/badge/Status-Development-yellow)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Diagram DFD](#-diagram-dfd)
- [Flowchart](#-flowchart)
- [Struktur Folder](#-struktur-folder)
- [Instalasi](#-instalasi)
- [Manual Book](#-manual-book)
- [Screenshots](#-screenshots)
- [Timeline](#-timeline)
- [Kontributor](#-kontributor)

---

## 📖 Tentang Project

**FabricFlow** adalah sistem aplikasi berbasis web yang dirancang untuk mendigitalisasi operasional toko kain. Sistem ini mencakup fitur kasir digital, manajemen stok, pencatatan kain rusak, dan laporan otomatis.

### Latar Belakang Masalah

| Masalah | Dampak |
|---------|--------|
| Pencatatan manual | Selisih uang di akhir hari |
| Stok tidak akurat | Kehilangan penjualan |
| Laporan manual | Memakan waktu lama |
| Kain rusak tidak tercatat | Kerugian tidak terdeteksi |

### Solusi FabricFlow


- ✅ Kasir digital dengan perhitungan otomatis
- ✅ Manajemen stok real-time per meter/yard
- ✅ Pencatatan kain rusak dengan dokumentasi foto
- ✅ Laporan penjualan & stok otomatis
- ✅ Audit log untuk tracking perubahan data
- ✅ Multi-user dengan role-based access

---

## ✨ Fitur Utama

### 1. 🛒 Kasir Digital (Point of Sale)
- Pencarian produk cepat
- Input jumlah dalam meter/yard
- Keranjang belanja dinamis
- Perhitungan otomatis (subtotal, diskon, total)
- Multiple metode pembayaran (Tunai, Transfer, QRIS)
- Cetak struk (simulasi)

### 2. 📦 Manajemen Produk
- CRUD produk lengkap
- Atribut: kode, nama, kategori, warna, harga, stok, foto
- Kategorisasi kain (Katun, Sutra, Polyester, dll)
- Upload foto produk

### 3. 📈 Manajemen Stok
- Monitoring stok real-time
- Alert stok menipis
- Adjustment stok manual
- Riwayat perubahan stok lengkap
- Konversi satuan (meter ↔ yard)

### 4. 🔴 Pencatatan Kain Rusak
- Input kerusakan dengan jumlah meter
- Upload foto bukti kerusakan
- Pencatatan alasan kerusakan
- Otomatis mengurangi stok

### 5. 📊 Laporan
- Laporan penjualan (harian/mingguan/bulanan)
- Laporan stok
- Laporan kerusakan kain
- Export ke CSV (simulasi)
- Grafik visualisasi data

### 6. 👥 Manajemen User
- Role-based access control
- Tambah/edit/nonaktifkan user
- Reset password

### 7. 📝 Audit Log
- Tracking semua aktivitas user
- Log perubahan data
- Filter berdasarkan user/tanggal/aksi

---

## 👥 User Roles

### 1. Admin/Owner

```
┌─────────────────────────────────────────────────────────┐
│                    HAK AKSES ADMIN                      │
├─────────────────────────────────────────────────────────┤
│  ✅ Dashboard         - Lihat semua statistik          │
│  ✅ Kasir             - Melakukan transaksi            │
│  ✅ Produk            - CRUD produk (tambah/edit/hapus)│
│  ✅ Stok              - Adjustment & lihat history     │
│  ✅ Kain Rusak        - Catat kerusakan                │
│  ✅ Transaksi         - Lihat semua & void transaksi   │
│  ✅ Laporan           - Akses semua laporan            │
│  ✅ Kelola User       - Tambah/edit/hapus user         │
│  ✅ Audit Log         - Lihat semua aktivitas          │
└─────────────────────────────────────────────────────────┘
```

### 2. Kasir

```
┌─────────────────────────────────────────────────────────┐
│                    HAK AKSES KASIR                      │
├─────────────────────────────────────────────────────────┤
│  ✅ Dashboard         - Lihat statistik terbatas       │
│  ✅ Kasir             - Melakukan transaksi            │
│  ✅ Produk            - Lihat produk (read only)       │
│  ✅ Stok              - Lihat stok (read only)         │
│  ✅ Kain Rusak        - Catat kerusakan                │
│  ❌ Transaksi         - Tidak bisa void                │
│  ❌ Laporan           - Tidak bisa akses               │
│  ❌ Kelola User       - Tidak bisa akses               │
│  ❌ Audit Log         - Tidak bisa akses               │
└─────────────────────────────────────────────────────────┘
```

### Tabel Perbandingan Akses

| Fitur | Admin | Kasir |
|-------|:-----:|:-----:|
| Dashboard | ✅ Full | ✅ Limited |
| Transaksi Kasir | ✅ | ✅ |
| Lihat Produk | ✅ | ✅ |
| Tambah/Edit Produk | ✅ | ❌ |
| Hapus Produk | ✅ | ❌ |
| Lihat Stok | ✅ | ✅ |
| Adjustment Stok | ✅ | ❌ |
| Catat Kain Rusak | ✅ | ✅ |
| Void Transaksi | ✅ | ❌ |
| Laporan | ✅ | ❌ |
| Kelola User | ✅ | ❌ |
| Audit Log | ✅ | ❌ |

---

## 🛠 Tech Stack

### Frontend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React.js | 18.x | Library UI |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing/navigasi |
| Zustand | 4.x | State management |
| Axios | 1.x | HTTP client |
| Recharts | 2.x | Grafik & chart |
| React Hook Form | 7.x | Form handling |
| React Hot Toast | 2.x | Notifikasi |
| Lucide React | - | Icons |

### Backend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 18.x | Runtime |
| Express.js | 4.x | Web framework |
| SQLite3 | 5.x | Database |
| Better-sqlite3 | 9.x | SQLite driver |
| JWT | 9.x | Authentication |
| Bcrypt | 5.x | Password hashing |
| Multer | 1.x | File upload |
| Cors | 2.x | Cross-origin |
| Express Validator | 7.x | Validasi input |

### Diagram Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React.js)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Vite      │  │  Tailwind   │  │   Zustand   │              │
│  │  (Build)    │  │   (CSS)     │  │   (State)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │React Router │  │   Axios     │  │  Recharts   │              │
│  │ (Routing)   │  │   (HTTP)    │  │  (Charts)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │    JWT      │  │   Bcrypt    │  │   Multer    │              │
│  │   (Auth)    │  │ (Password)  │  │  (Upload)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │    CORS     │  │  Validator  │                               │
│  │  (Security) │  │  (Input)    │                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────┬───────────────────────────────────┘
                              │ SQL Queries
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (SQLite)                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  users   │ │  produk  │ │transaksi │ │ stok_log │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │kain_rusak│ │trans_item│ │audit_log │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗 Arsitektur Sistem

### Arsitektur 3-Tier

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│                        (Frontend)                                │
│                                                                  │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│   │  Login  │ │Dashboard│ │  Kasir  │ │ Produk  │ │  Stok   │  │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│   │  Rusak  │ │Transaksi│ │ Laporan │ │  Users  │ │  Audit  │  │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BUSINESS LAYER                             │
│                        (Backend API)                             │
│                                                                  │
│   ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│   │  Auth Service   │  │ Product Service │  │ Stock Service  │  │
│   │  - Login        │  │  - CRUD Produk  │  │  - Get Stock   │  │
│   │  - Verify JWT   │  │  - Search       │  │  - Adjustment  │  │
│   │  - Logout       │  │  - Filter       │  │  - History     │  │
│   └─────────────────┘  └─────────────────┘  └────────────────┘  │
│   ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│   │  Trans Service  │  │ Report Service  │  │ Damage Service │  │
│   │  - Create       │  │  - Sales        │  │  - Record      │  │
│   │  - Void         │  │  - Stock        │  │  - List        │  │
│   │  - List         │  │  - Export       │  │  - Stats       │  │
│   └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
│                        (Database)                                │
│                                                                  │
│                      ┌─────────────┐                            │
│                      │   SQLite    │                            │
│                      │  Database   │                            │
│                      └─────────────┘                            │
│                                                                  │
│   Tables: users, produk, transaksi, transaksi_item,             │
│           stok_log, kain_rusak, audit_log                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💾 Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │     produk      │       │   kain_rusak    │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ PK id           │       │ PK id           │       │ PK id           │
│    nama         │       │    kode         │       │ FK produk_id    │
│    email        │       │    nama         │       │    jumlah       │
│    password     │       │    kategori     │       │    alasan       │
│    role         │       │    warna        │       │    foto         │
│    aktif        │       │    harga        │       │ FK user_id      │
│    created_at   │       │    stok         │       │    created_at   │
└────────┬────────┘       │    satuan       │       └─────────────────┘
         │                │    foto         │                │
         │                │    created_at   │                │
         │                │    updated_at   │                │
         │                └────────┬────────┘                │
         │                         │                         │
         │    ┌────────────────────┼────────────────────┐    │
         │    │                    │                    │    │
         ▼    ▼                    ▼                    ▼    ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   transaksi     │       │    stok_log     │       │   audit_log     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ PK id           │       │ PK id           │       │ PK id           │
│    nomor        │       │ FK produk_id    │       │ FK user_id      │
│    tanggal      │       │    jumlah       │       │    aksi         │
│ FK user_id      │       │    stok_sebelum │       │    tabel        │
│    total        │       │    stok_sesudah │       │    data_id      │
│    diskon       │       │    tipe         │       │    data_lama    │
│    grand_total  │       │    referensi    │       │    data_baru    │
│    metode_bayar │       │ FK user_id      │       │    created_at   │
│    status       │       │    catatan      │       └─────────────────┘
│    catatan      │       │    created_at   │
└────────┬────────┘       └─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│ transaksi_item  │
├─────────────────┤
│ PK id           │
│ FK transaksi_id │
│ FK produk_id    │
│    jumlah       │
│    harga_satuan │
│    subtotal     │
└─────────────────┘
```

### Detail Tabel

#### 1. Tabel `users`

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'kasir')) NOT NULL,
    aktif BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik user |
| nama | TEXT | NOT NULL | Nama lengkap |
| email | TEXT | UNIQUE, NOT NULL | Email untuk login |
| password | TEXT | NOT NULL | Password (bcrypt hash) |
| role | TEXT | CHECK | 'admin' atau 'kasir' |
| aktif | BOOLEAN | DEFAULT 1 | Status aktif |
| created_at | DATETIME | DEFAULT NOW | Tanggal dibuat |

#### 2. Tabel `produk`

```sql
CREATE TABLE produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kode TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    kategori TEXT NOT NULL,
    warna TEXT,
    harga DECIMAL(10,2) NOT NULL,
    stok DECIMAL(10,2) DEFAULT 0,
    satuan TEXT DEFAULT 'meter',
    foto TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik produk |
| kode | TEXT | UNIQUE, NOT NULL | Kode produk (KTN-001) |
| nama | TEXT | NOT NULL | Nama kain |
| kategori | TEXT | NOT NULL | Kategori kain |
| warna | TEXT | - | Warna kain |
| harga | DECIMAL | NOT NULL | Harga per meter |
| stok | DECIMAL | DEFAULT 0 | Stok dalam meter |
| satuan | TEXT | DEFAULT 'meter' | Satuan (meter/yard) |
| foto | TEXT | - | Path foto produk |
| created_at | DATETIME | DEFAULT NOW | Tanggal dibuat |
| updated_at | DATETIME | DEFAULT NOW | Tanggal diupdate |

#### 3. Tabel `transaksi`

```sql
CREATE TABLE transaksi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomor TEXT UNIQUE NOT NULL,
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    diskon DECIMAL(12,2) DEFAULT 0,
    grand_total DECIMAL(12,2) NOT NULL,
    metode_bayar TEXT DEFAULT 'tunai',
    status TEXT DEFAULT 'selesai',
    catatan TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik transaksi |
| nomor | TEXT | UNIQUE, NOT NULL | Nomor transaksi |
| tanggal | DATETIME | DEFAULT NOW | Waktu transaksi |
| user_id | INTEGER | FK, NOT NULL | ID kasir |
| total | DECIMAL | NOT NULL | Total sebelum diskon |
| diskon | DECIMAL | DEFAULT 0 | Nominal diskon |
| grand_total | DECIMAL | NOT NULL | Total akhir |
| metode_bayar | TEXT | DEFAULT 'tunai' | Metode pembayaran |
| status | TEXT | DEFAULT 'selesai' | Status transaksi |
| catatan | TEXT | - | Catatan tambahan |

#### 4. Tabel `transaksi_item`

```sql
CREATE TABLE transaksi_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaksi_id INTEGER NOT NULL,
    produk_id INTEGER NOT NULL,
    jumlah DECIMAL(10,2) NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (transaksi_id) REFERENCES transaksi(id),
    FOREIGN KEY (produk_id) REFERENCES produk(id)
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik item |
| transaksi_id | INTEGER | FK, NOT NULL | ID transaksi |
| produk_id | INTEGER | FK, NOT NULL | ID produk |
| jumlah | DECIMAL | NOT NULL | Jumlah meter |
| harga_satuan | DECIMAL | NOT NULL | Harga saat transaksi |
| subtotal | DECIMAL | NOT NULL | jumlah × harga |

#### 5. Tabel `stok_log`

```sql
CREATE TABLE stok_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produk_id INTEGER NOT NULL,
    jumlah DECIMAL(10,2) NOT NULL,
    stok_sebelum DECIMAL(10,2) NOT NULL,
    stok_sesudah DECIMAL(10,2) NOT NULL,
    tipe TEXT NOT NULL,
    referensi TEXT,
    user_id INTEGER NOT NULL,
    catatan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES produk(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik log |
| produk_id | INTEGER | FK, NOT NULL | ID produk |
| jumlah | DECIMAL | NOT NULL | Perubahan (+/-) |
| stok_sebelum | DECIMAL | NOT NULL | Stok sebelum |
| stok_sesudah | DECIMAL | NOT NULL | Stok sesudah |
| tipe | TEXT | NOT NULL | masuk/keluar/adjustment/rusak |
| referensi | TEXT | - | ID transaksi/kerusakan |
| user_id | INTEGER | FK, NOT NULL | ID user |
| catatan | TEXT | - | Keterangan |
| created_at | DATETIME | DEFAULT NOW | Waktu |

#### 6. Tabel `kain_rusak`

```sql
CREATE TABLE kain_rusak (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produk_id INTEGER NOT NULL,
    jumlah DECIMAL(10,2) NOT NULL,
    alasan TEXT NOT NULL,
    foto TEXT,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES produk(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik record |
| produk_id | INTEGER | FK, NOT NULL | ID produk |
| jumlah | DECIMAL | NOT NULL | Jumlah meter rusak |
| alasan | TEXT | NOT NULL | Alasan kerusakan |
| foto | TEXT | - | Foto bukti |
| user_id | INTEGER | FK, NOT NULL | ID pelapor |
| created_at | DATETIME | DEFAULT NOW | Tanggal dicatat |

#### 7. Tabel `audit_log`

```sql
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    aksi TEXT NOT NULL,
    tabel TEXT NOT NULL,
    data_id INTEGER,
    data_lama TEXT,
    data_baru TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| id | INTEGER | PK, AUTO | ID unik log |
| user_id | INTEGER | FK, NOT NULL | ID user |
| aksi | TEXT | NOT NULL | create/update/delete/login |
| tabel | TEXT | NOT NULL | Nama tabel |
| data_id | INTEGER | - | ID record |
| data_lama | TEXT | - | JSON data sebelum |
| data_baru | TEXT | - | JSON data sesudah |
| created_at | DATETIME | DEFAULT NOW | Waktu |

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

Semua endpoint (kecuali login) memerlukan JWT token di header:
```
Authorization: Bearer <token>
```

### Endpoints

#### 🔐 Auth

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/logout` | Logout user | ✅ |
| GET | `/auth/me` | Get current user | ✅ |

**POST /auth/login**
```json
// Request
{
    "email": "admin@fabricflow.com",
    "password": "password123"
}

// Response 200
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "nama": "Admin",
            "email": "admin@fabricflow.com",
            "role": "admin"
        }
    }
}
```

#### 📦 Produk

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/produk` | List semua produk | ✅ | All |
| GET | `/produk/:id` | Detail produk | ✅ | All |
| POST | `/produk` | Tambah produk | ✅ | Admin |
| PUT | `/produk/:id` | Update produk | ✅ | Admin |
| DELETE | `/produk/:id` | Hapus produk | ✅ | Admin |

**GET /produk**
```json
// Response 200
{
    "success": true,
    "data": [
        {
            "id": 1,
            "kode": "KTN-001",
            "nama": "Katun Jepang Premium",
            "kategori": "Katun",
            "warna": "Putih",
            "harga": 75000,
            "stok": 150.5,
            "satuan": "meter",
            "foto": "/uploads/ktn-001.jpg"
        }
    ]
}
```

**POST /produk**
```json
// Request (multipart/form-data)
{
    "kode": "KTN-002",
    "nama": "Katun Combed 30s",
    "kategori": "Katun",
    "warna": "Hitam",
    "harga": 65000,
    "stok": 200,
    "satuan": "meter",
    "foto": <file>
}

// Response 201
{
    "success": true,
    "message": "Produk berhasil ditambahkan",
    "data": { "id": 2, ... }
}
```

#### 🛒 Transaksi

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/transaksi` | List transaksi | ✅ | All |
| GET | `/transaksi/:id` | Detail transaksi | ✅ | All |
| POST | `/transaksi` | Buat transaksi | ✅ | All |
| PUT | `/transaksi/:id/void` | Void transaksi | ✅ | Admin |

**POST /transaksi**
```json
// Request
{
    "items": [
        { "produk_id": 1, "jumlah": 2.5 },
        { "produk_id": 3, "jumlah": 1.0 }
    ],
    "diskon": 10000,
    "metode_bayar": "tunai",
    "catatan": "Pelanggan reguler"
}

// Response 201
{
    "success": true,
    "message": "Transaksi berhasil",
    "data": {
        "id": 1,
        "nomor": "TRX-20241211-001",
        "total": 250000,
        "diskon": 10000,
        "grand_total": 240000,
        "items": [...]
    }
}
```

#### 📈 Stok

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/stok` | List stok | ✅ | All |
| GET | `/stok/log` | History stok | ✅ | All |
| POST | `/stok/adjustment` | Adjustment stok | ✅ | Admin |

**POST /stok/adjustment**
```json
// Request
{
    "produk_id": 1,
    "jumlah": 50,
    "tipe": "masuk",
    "catatan": "Restok dari supplier"
}

// Response 200
{
    "success": true,
    "message": "Stok berhasil diupdate",
    "data": {
        "stok_sebelum": 150.5,
        "stok_sesudah": 200.5
    }
}
```

#### 🔴 Kain Rusak

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/rusak` | List kain rusak | ✅ | All |
| POST | `/rusak` | Catat kerusakan | ✅ | All |

**POST /rusak**
```json
// Request (multipart/form-data)
{
    "produk_id": 1,
    "jumlah": 2.5,
    "alasan": "Terkena air hujan saat pengiriman",
    "foto": <file>
}

// Response 201
{
    "success": true,
    "message": "Kerusakan berhasil dicatat"
}
```

#### 📊 Laporan

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/laporan/penjualan` | Laporan penjualan | ✅ | Admin |
| GET | `/laporan/stok` | Laporan stok | ✅ | Admin |
| GET | `/laporan/kerusakan` | Laporan kerusakan | ✅ | Admin |

**GET /laporan/penjualan?periode=mingguan**
```json
// Response 200
{
    "success": true,
    "data": {
        "periode": "mingguan",
        "tanggal_mulai": "2024-12-05",
        "tanggal_akhir": "2024-12-11",
        "total_transaksi": 45,
        "total_penjualan": 15750000,
        "rata_rata": 350000,
        "detail": [
            { "tanggal": "2024-12-05", "jumlah": 8, "total": 2800000 },
            { "tanggal": "2024-12-06", "jumlah": 6, "total": 2100000 },
            ...
        ]
    }
}
```

#### 👥 Users

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/users` | List users | ✅ | Admin |
| POST | `/users` | Tambah user | ✅ | Admin |
| PUT | `/users/:id` | Update user | ✅ | Admin |
| DELETE | `/users/:id` | Hapus user | ✅ | Admin |

#### 📝 Audit Log

| Method | Endpoint | Deskripsi | Auth | Role |
|--------|----------|-----------|------|------|
| GET | `/audit` | List audit log | ✅ | Admin |

---

## 📊 Diagram DFD

### DFD Level 0 (Context Diagram)

```
                                    ┌─────────────────┐
                                    │                 │
              Login Request         │                 │         Data Produk
         ─────────────────────────▶ │                 │ ◀─────────────────────
              User Info             │                 │         CRUD Response
         ◀───────────────────────── │                 │ ─────────────────────▶
                                    │                 │
    ┌────────┐                      │   FabricFlow    │                      ┌────────┐
    │        │   Transaksi Data     │     System      │   Laporan Request    │        │
    │ Kasir  │ ────────────────────▶│                 │◀──────────────────── │ Admin  │
    │        │   Struk/Receipt      │                 │   Laporan Data       │        │
    │        │ ◀────────────────────│                 │────────────────────▶ │        │
    └────────┘                      │                 │                      └────────┘
                                    │                 │
              Stok Query            │                 │         User Mgmt
         ─────────────────────────▶ │                 │ ◀─────────────────────
              Stok Info             │                 │         Response
         ◀───────────────────────── │                 │ ─────────────────────▶
                                    │                 │
                                    └─────────────────┘
```

### DFD Level 1

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│    ┌────────┐          ┌─────────────┐                                         │
│    │        │  Login   │             │                                         │
│    │  User  │─────────▶│  1.0 Auth   │──────────┐                              │
│    │        │◀─────────│   Process   │          │                              │
│    └────────┘  Token   └─────────────┘          │                              │
│        │                                        ▼                              │
│        │                               ┌─────────────────┐                     │
│        │                               │                 │                     │
│        │    ┌─────────────┐           │   D1: Users     │                     │
│        │    │             │           │                 │                     │
│        ├───▶│  2.0 Kasir  │           └─────────────────┘                     │
│        │    │   (POS)     │                    │                              │
│        │    └──────┬──────┘                    │                              │
│        │           │                           │                              │
│        │           │ Transaksi                 │                              │
│        │           ▼                           │                              │
│        │    ┌─────────────────┐               │                              │
│        │    │                 │               │                              │
│        │    │  D2: Transaksi  │◀──────────────┘                              │
│        │    │                 │                                              │
│        │    └────────┬────────┘                                              │
│        │             │                                                        │
│        │             │ Update Stok                                           │
│        │             ▼                                                        │
│        │    ┌─────────────────┐      ┌─────────────┐                         │
│        │    │                 │      │             │                         │
│        ├───▶│   D3: Produk    │◀────▶│ 3.0 Manage  │◀────┐                   │
│        │    │                 │      │   Produk    │     │                   │
│        │    └────────┬────────┘      └─────────────┘     │                   │
│        │             │                                    │                   │
│        │             │                                    │                   │
│        │             ▼                                    │                   │
│        │    ┌─────────────────┐      ┌─────────────┐     │    ┌────────┐    │
│        │    │                 │      │             │     │    │        │    │
│        └───▶│  D4: Stok_Log   │◀────▶│  4.0 Stok   │◀────┼────│ Admin  │    │
│             │                 │      │  Management │     │    │        │    │
│             └─────────────────┘      └─────────────┘     │    └────────┘    │
│                                                          │         │        │
│             ┌─────────────────┐      ┌─────────────┐     │         │        │
│             │                 │      │             │     │         │        │
│             │ D5: Kain_Rusak  │◀────▶│  5.0 Damage │◀────┤        │      │
│             │                 │      │   Record    │     │         │        │
│             └─────────────────┘      └─────────────┘     │         │        │
│                                                          │         │        │
│             ┌─────────────────┐      ┌─────────────┐     │         │        │
│             │                 │      │             │     │         │        │
│             │  D6: Audit_Log  │◀────▶│ 6.0 Laporan │◀────┘        │        │
│             │                 │      │  & Audit    │◀──────────────┘        │
│             └─────────────────┘      └─────────────┘                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### DFD Level 2 - Proses Kasir (2.0)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           2.0 KASIR (POS)                                   │
│                                                                             │
│   ┌────────┐                                                                │
│   │        │    Pilih Produk     ┌─────────────┐                           │
│   │ Kasir  │────────────────────▶│             │                           │
│   │        │                     │ 2.1 Cari &  │◀────────┐                 │
│   └────────┘                     │ Pilih Produk│         │                 │
│       │                          └──────┬──────┘         │                 │
│       │                                 │                │                 │
│       │                                 │ Data Produk    │                 │
│       │                                 ▼                │                 │
│       │                          ┌─────────────┐         │                 │
│       │    Input Jumlah          │             │    ┌────┴────┐            │
│       │─────────────────────────▶│ 2.2 Input   │    │         │            │
│       │                          │   Jumlah    │    │D3:Produk│            │
│       │                          └──────┬──────┘    │         │            │
│       │                                 │           └─────────┘            │
│       │                                 │ Item                             │
│       │                                 ▼                                  │
│       │                          ┌─────────────┐                           │
│       │                          │             │                           │
│       │                          │2.3 Keranjang│                           │
│       │                          │   Belanja   │                           │
│       │                          └──────┬──────┘                           │
│       │                                 │                                  │
│       │    Proses Bayar                 │ Items                            │
│       │─────────────────────────────────┤                                  │
│       │                                 ▼                                  │
│       │                          ┌─────────────┐      ┌───────────┐        │
│       │                          │             │      │           │        │
│       │                          │ 2.4 Hitung  │─────▶│D2:Transaksi│       │
│       │                          │   Total     │      │           │        │
│       │                          └──────┬──────┘      └───────────┘        │
│       │                                 │                    │             │
│       │                                 │                    │             │
│       │                                 ▼                    ▼             │
│       │                          ┌─────────────┐      ┌───────────┐        │
│       │◀─────────────────────────│ 2.5 Cetak   │      │D4:Stok_Log│        │
│       │    Struk                 │   Struk     │      │           │        │
│                                  └─────────────┘      └───────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flowchart

### Flowchart Login

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Tampilkan   │
                    │ Form Login  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Input Email │
                    │ & Password  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Klik Login  │
                    └──────┬──────┘
                           │
                           ▼
                  ┌────────────────┐
                  │ Validasi Input │
                  │  (tidak kosong)│
                  └───────┬────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        ┌──────────┐           ┌──────────┐
        │  Valid   │           │ Invalid  │
        └────┬─────┘           └────┬─────┘
             │                      │
             ▼                      ▼
      ┌─────────────┐        ┌─────────────┐
      │ Kirim ke    │        │ Tampilkan   │
      │ Server API  │        │ Error Msg   │
      └──────┬──────┘        └──────┬──────┘
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Cek Email & │               │
      │ Password DB │               │
      └──────┬──────┘               │
             │                      │
    ┌────────┴────────┐             │
    │                 │             │
    ▼                 ▼             │
┌────────┐      ┌──────────┐        │
│ Match  │      │ No Match │        │
└───┬────┘      └────┬─────┘        │
    │                │              │
    ▼                ▼              │
┌─────────┐   ┌───────────┐         │
│Generate │   │ Return    │         │
│JWT Token│   │ Error 401 │─────────┤
└────┬────┘   └───────────┘         │
     │                              │
     ▼                              │
┌─────────┐                         │
│ Simpan  │                         │
│ Token   │                         │
└────┬────┘                         │
     │                              │
     ▼                              │
┌─────────┐                         │
│Redirect │                         │
│Dashboard│                         │
└────┬────┘                         │
     │                              │
     ▼                              │
┌─────────┐                         │
│   END   │◀────────────────────────┘
└─────────┘
```

### Flowchart Transaksi Kasir

```
                         ┌─────────────┐
                         │   START     │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │  Buka Menu  │
                         │   Kasir     │
                         └──────┬──────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │ Cari/Pilih Produk     │◀──────────────┐
                    │ dari Daftar           │               │
                    └───────────┬───────────┘               │
                                │                           │
                                ▼                           │
                         ┌─────────────┐                    │
                         │Input Jumlah │                    │
                         │  (meter)    │                    │
                         └──────┬──────┘                    │
                                │                           │
                                ▼                           │
                       ┌────────────────┐                   │
                       │ Stok Cukup?    │                   │
                       └───────┬────────┘                   │
                               │                            │
               ┌───────────────┴───────────────┐            │
               │                               │            │
               ▼                               ▼            │
         ┌──────────┐                   ┌──────────┐        │
         │   Ya     │                   │  Tidak   │        │
         └────┬─────┘                   └────┬─────┘        │
              │                              │              │
              ▼                              ▼              │
       ┌─────────────┐               ┌─────────────┐        │
       │ Tambah ke   │               │ Tampilkan   │        │
       │ Keranjang   │               │ Alert Error │        │
       └──────┬──────┘               └──────┬──────┘        │
              │                             │               │
              ▼                             │               │
       ┌─────────────┐                      │               │
       │ Hitung      │                      │               │
       │ Subtotal    │                      │               │
       └──────┬──────┘                      │               │
              │                             │               │
              ▼                             │               │
       ┌─────────────┐                      │               │
       │ Tambah Item │                      │               │
       │ Lagi?       │                      │               │
       └──────┬──────┘                      │               │
              │                             │               │
     ┌────────┴────────┐                    │               │
     │                 │                    │               │
     ▼                 ▼                    │               │
┌─────────┐      ┌──────────┐               │               │
│   Ya    │      │  Tidak   │               │               │
└────┬────┘      └────┬─────┘               │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Input Diskon│              │               │
     │         │ (optional)  │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Hitung Grand│              │               │
     │         │ Total       │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Pilih Metode│              │               │
     │         │ Pembayaran  │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Konfirmasi  │              │               │
     │         │ Transaksi   │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Simpan ke   │              │               │
     │         │ Database    │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Update Stok │              │               │
     │         │ Produk      │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Catat Stok  │              │               │
     │         │ Log         │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Tampilkan   │              │               │
     │         │ Struk       │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │                ▼                     │               │
     │         ┌─────────────┐              │               │
     │         │ Transaksi   │              │               │
     │         │ Baru?       │              │               │
     │         └──────┬──────┘              │               │
     │                │                     │               │
     │       ┌────────┴────────┐            │               │
     │       │                 │            │               │
     │       ▼                 ▼            │               │
     │  ┌─────────┐      ┌──────────┐       │               │
     │  │   Ya    │      │  Tidak   │       │               │
     │  └────┬────┘      └────┬─────┘       │               │
     │       │                │             │               │
     └───────┼────────────────┘             │               │
             │                              │               │
             │         ┌────────────────────┘               │
             │         │                                    │
             ▼         ▼                                    │
         ┌─────────────┐                                    │
         │    END      │◀───────────────────────────────────┘
         └─────────────┘
```

### Flowchart Pencatatan Kain Rusak

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Buka Menu   │
                    │ Kain Rusak  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Klik Tambah │
                    │ Kerusakan   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Pilih Produk│
                    │ yang Rusak  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Input Jumlah│
                    │ Meter Rusak │
                    └──────┬──────┘
                           │
                           ▼
                  ┌────────────────┐
                  │ Jumlah <= Stok?│
                  └───────┬────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        ┌──────────┐           ┌──────────┐
        │   Ya     │           │  Tidak   │
        └────┬─────┘           └────┬─────┘
             │                      │
             ▼                      ▼
      ┌─────────────┐        ┌─────────────┐
      │ Input Alasan│        │ Tampilkan   │
      │ Kerusakan   │        │ Error       │
      └──────┬──────┘        └──────┬──────┘
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Upload Foto │               │
      │ (optional)  │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │   Simpan    │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Simpan ke   │               │
      │ DB Rusak    │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Kurangi Stok│               │
      │ Produk      │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Catat ke    │               │
      │ Stok Log    │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Tampilkan   │               │
      │ Sukses      │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │    END      │◀──────────────┘
      └─────────────┘
```

### Flowchart Adjustment Stok

```
                    ┌─────────────┐
                    │   START     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Buka Menu   │
                    │ Stok        │
                    └──────┬──────┘
                           │
                           ▼
                  ┌────────────────┐
                  │ Role = Admin?  │
                  └───────┬────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        ┌──────────┐           ┌──────────┐
        │   Ya     │           │  Tidak   │
        └────┬─────┘           └────┬─────┘
             │                      │
             ▼                      ▼
      ┌─────────────┐        ┌─────────────┐
      │ Klik        │        │ Tombol      │
      │ Adjustment  │        │ Disabled    │
      └──────┬──────┘        └──────┬──────┘
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Pilih Produk│               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Pilih Tipe: │               │
      │ Masuk/Keluar│               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Input Jumlah│               │
      │ (meter)     │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Input       │               │
      │ Catatan     │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │   Simpan    │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Hitung Stok │               │
      │ Baru        │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Update Stok │               │
      │ Produk      │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Catat ke    │               │
      │ Stok Log    │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Catat ke    │               │
      │ Audit Log   │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │ Tampilkan   │               │
      │ Sukses      │               │
      └──────┬──────┘               │
             │                      │
             ▼                      │
      ┌─────────────┐               │
      │    END      │◀──────────────┘
      └─────────────┘
```

---

## 📁 Struktur Folder

```
FabricFlow/
│
├── 📁 frontend/                    # React Frontend
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   └── index.html
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/              # Gambar, font, dll
│   │   │   ├── images/
│   │   │   └── logo.svg
│   │   │
│   │   ├── 📁 components/          # Komponen Reusable
│   │   │   ├── 📁 common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   └── Loading.jsx
│   │   │   │
│   │   │   ├── 📁 layout/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   │
│   │   │   └── 📁 charts/
│   │   │       ├── SalesChart.jsx
│   │   │       └── StockChart.jsx
│   │   │
│   │   ├── 📁 pages/               # Halaman Utama
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── 📁 kasir/
│   │   │   │   ├── Kasir.jsx
│   │   │   │   └── Struk.jsx
│   │   │   ├── 📁 produk/
│   │   │   │   ├── ProdukList.jsx
│   │   │   │   ├── ProdukForm.jsx
│   │   │   │   └── ProdukDetail.jsx
│   │   │   ├── 📁 stok/
│   │   │   │   ├── StokList.jsx
│   │   │   │   ├── StokLog.jsx
│   │   │   │   └── StokAdjustment.jsx
│   │   │   ├── 📁 rusak/
│   │   │   │   ├── RusakList.jsx
│   │   │   │   └── RusakForm.jsx
│   │   │   ├── 📁 transaksi/
│   │   │   │   ├── TransaksiList.jsx
│   │   │   │   └── TransaksiDetail.jsx
│   │   │   ├── 📁 laporan/
│   │   │   │   ├── LaporanPenjualan.jsx
│   │   │   │   ├── LaporanStok.jsx
│   │   │   │   └── LaporanKerusakan.jsx
│   │   │   ├── 📁 users/
│   │   │   │   ├── UserList.jsx
│   │   │   │   └── UserForm.jsx
│   │   │   └── 📁 audit/
│   │   │       └── AuditLog.jsx
│   │   │
│   │   ├── 📁 store/               # Zustand State Management
│   │   │   ├── authStore.js
│   │   │   ├── produkStore.js
│   │   │   ├── transaksiStore.js
│   │   │   ├── stokStore.js
│   │   │   └── uiStore.js
│   │   │
│   │   ├── 📁 services/            # API Services
│   │   │   ├── api.js              # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── produkService.js
│   │   │   ├── transaksiService.js
│   │   │   ├── stokService.js
│   │   │   ├── rusakService.js
│   │   │   ├── laporanService.js
│   │   │   ├── userService.js
│   │   │   └── auditService.js
│   │   │
│   │   ├── 📁 hooks/               # Custom Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useDebounce.js
│   │   │   └── usePagination.js
│   │   │
│   │   ├── 📁 utils/               # Helper Functions
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   ├── validation.js
│   │   │   └── constants.js
│   │   │
│   │   ├── 📁 routes/              # Route Configuration
│   │   │   ├── index.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx                 # Main App Component
│   │   ├── main.jsx                # Entry Point
│   │   └── index.css               # Global Styles
│   │
│   ├── .env                        # Environment Variables
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── 📁 backend/                     # Node.js Backend
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   ├── database.js         # SQLite Configuration
│   │   │   └── jwt.js              # JWT Configuration
│   │   │
│   │   ├── 📁 controllers/         # Request Handlers
│   │   │   ├── authController.js
│   │   │   ├── produkController.js
│   │   │   ├── transaksiController.js
│   │   │   ├── stokController.js
│   │   │   ├── rusakController.js
│   │   │   ├── laporanController.js
│   │   │   ├── userController.js
│   │   │   └── auditController.js
│   │   │
│   │   ├── 📁 middleware/          # Express Middleware
│   │   │   ├── auth.js             # JWT Verification
│   │   │   ├── roleCheck.js        # Role-based Access
│   │   │   ├── validate.js         # Input Validation
│   │   │   ├── upload.js           # Multer Config
│   │   │   └── errorHandler.js     # Error Handling
│   │   │
│   │   ├── 📁 models/              # Database Queries
│   │   │   ├── userModel.js
│   │   │   ├── produkModel.js
│   │   │   ├── transaksiModel.js
│   │   │   ├── stokModel.js
│   │   │   ├── rusakModel.js
│   │   │   └── auditModel.js
│   │   │
│   │   ├── 📁 routes/              # API Routes
│   │   │   ├── index.js            # Route Aggregator
│   │   │   ├── authRoutes.js
│   │   │   ├── produkRoutes.js
│   │   │   ├── transaksiRoutes.js
│   │   │   ├── stokRoutes.js
│   │   │   ├── rusakRoutes.js
│   │   │   ├── laporanRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── auditRoutes.js
│   │   │
│   │   ├── 📁 utils/               # Helper Functions
│   │   │   ├── generateNomor.js    # Generate Transaction Number
│   │   │   ├── logger.js           # Logging Utility
│   │   │   └── response.js         # Response Formatter
│   │   │
│   │   ├── 📁 validators/          # Input Validators
│   │   │   ├── authValidator.js
│   │   │   ├── produkValidator.js
│   │   │   └── transaksiValidator.js
│   │   │
│   │   └── app.js                  # Express App Setup
│   │
│   ├── 📁 database/
│   │   ├── schema.sql              # Database Schema
│   │   ├── seed.sql                # Demo Data
│   │   └── fabricflow.db           # SQLite Database File
│   │
│   ├── 📁 uploads/                 # Uploaded Files
│   │   ├── produk/                 # Product Images
│   │   └── rusak/                  # Damage Photos
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # Entry Point
│
├── 📁 docs/                        # Documentation
│   ├── api.md                      # API Documentation
│   ├── database.md                 # Database Documentation
│   └── deployment.md               # Deployment Guide
│
├── .gitignore
├── README.md                       # This File
└── LICENSE
```

---

## 🚀 Instalasi

### Prasyarat

- Node.js v18 atau lebih baru
- npm atau yarn
- Git

### Langkah Instalasi (Development)

```bash
# 1. Clone repository
git clone https://github.com/zeen-lien/felina.git
cd felina

# 2. Masuk ke folder frontend
cd frontend

# 3. Install dependencies
npm install

# 4. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173/felina/`

### Deploy ke GitHub Pages (Gratis!)

```bash
# 1. Build aplikasi
npm run build

# 2. Deploy ke GitHub Pages
npm run deploy
```

Atau setup GitHub Actions untuk auto-deploy:

1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di bagian **Source**, pilih **GitHub Actions**
4. Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          cd frontend
          npm install
          npm run build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

Setelah push, aplikasi akan otomatis deploy ke:
**https://zeen-lien.github.io/felina/**

### Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fabricflow.com | admin123 |
| Kasir | kasir1@fabricflow.com | kasir123 |
| Kasir | kasir2@fabricflow.com | kasir123 |

---

## 📖 Manual Book

### Panduan Penggunaan FabricFlow

#### 1. Login ke Sistem

1. Buka aplikasi di browser
2. Masukkan email dan password
3. Klik tombol "Masuk"
4. Sistem akan mengarahkan ke Dashboard

```
┌─────────────────────────────────────────┐
│           🧵 FabricFlow                 │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ Email                           │   │
│   │ admin@fabricflow.com            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ Password                        │   │
│   │ ••••••••                        │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           MASUK                 │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### 2. Dashboard

Dashboard menampilkan ringkasan informasi:
- Total penjualan hari ini
- Jumlah transaksi
- Produk dengan stok menipis
- Grafik penjualan mingguan
- Transaksi terakhir

#### 3. Melakukan Transaksi (Kasir)

**Langkah-langkah:**

1. Klik menu "Kasir" di sidebar
2. Cari produk dengan mengetik nama/kode
3. Klik produk untuk menambahkan ke keranjang
4. Input jumlah meter yang dibeli
5. Ulangi untuk produk lain (jika ada)
6. Input diskon (opsional)
7. Pilih metode pembayaran
8. Klik "Proses Transaksi"
9. Struk akan ditampilkan

```
┌─────────────────────────────────────────────────────────────────┐
│  KASIR                                              [Transaksi] │
├─────────────────────────────────┬───────────────────────────────┤
│                                 │                               │
│  🔍 Cari produk...              │  KERANJANG                    │
│  ┌─────────────────────────┐    │  ─────────────────────────    │
│  │ KTN-001                 │    │  1. Katun Jepang              │
│  │ Katun Jepang Premium    │    │     2.5m × Rp75.000           │
│  │ Rp 75.000/meter         │    │     = Rp 187.500              │
│  │ Stok: 150m    [TAMBAH]  │    │                               │
│  └─────────────────────────┘    │  2. Sutra Thailand            │
│  ┌─────────────────────────┐    │     1.0m × Rp150.000          │
│  │ STR-001                 │    │     = Rp 150.000              │
│  │ Sutra Thailand          │    │  ─────────────────────────    │
│  │ Rp 150.000/meter        │    │  Subtotal:    Rp 337.500      │
│  │ Stok: 80m     [TAMBAH]  │    │  Diskon:      Rp  10.000      │
│  └─────────────────────────┘    │  ─────────────────────────    │
│                                 │  TOTAL:       Rp 327.500      │
│                                 │                               │
│                                 │  Metode: [Tunai ▼]            │
│                                 │                               │
│                                 │  [    PROSES TRANSAKSI    ]   │
│                                 │                               │
└─────────────────────────────────┴───────────────────────────────┘
```

#### 4. Mengelola Produk (Admin)

**Tambah Produk Baru:**
1. Klik menu "Produk"
2. Klik tombol "Tambah Produk"
3. Isi form:
   - Kode produk (unik)
   - Nama produk
   - Kategori
   - Warna
   - Harga per meter
   - Stok awal
   - Upload foto (opsional)
4. Klik "Simpan"

**Edit Produk:**
1. Klik ikon edit (✏️) pada produk
2. Ubah data yang diperlukan
3. Klik "Update"

**Hapus Produk:**
1. Klik ikon hapus (🗑️) pada produk
2. Konfirmasi penghapusan

#### 5. Manajemen Stok (Admin)

**Melihat Stok:**
1. Klik menu "Stok"
2. Lihat daftar stok semua produk
3. Produk dengan stok < 10 meter ditandai merah

**Adjustment Stok:**
1. Klik tombol "Adjustment"
2. Pilih produk
3. Pilih tipe: Masuk atau Keluar
4. Input jumlah meter
5. Input catatan/alasan
6. Klik "Simpan"

**Melihat History Stok:**
1. Klik tab "History"
2. Lihat semua perubahan stok
3. Filter berdasarkan produk/tanggal

#### 6. Mencatat Kain Rusak

1. Klik menu "Kain Rusak"
2. Klik "Tambah Kerusakan"
3. Pilih produk yang rusak
4. Input jumlah meter yang rusak
5. Pilih/input alasan kerusakan
6. Upload foto bukti (opsional)
7. Klik "Simpan"

> ⚠️ Stok akan otomatis berkurang sesuai jumlah kerusakan

#### 7. Melihat Laporan (Admin)

**Laporan Penjualan:**
1. Klik menu "Laporan"
2. Pilih tab "Penjualan"
3. Pilih periode (Harian/Mingguan/Bulanan)
4. Lihat grafik dan tabel penjualan
5. Klik "Export CSV" untuk download

**Laporan Stok:**
1. Pilih tab "Stok"
2. Lihat ringkasan stok semua produk
3. Lihat produk terlaris dan kurang laku

**Laporan Kerusakan:**
1. Pilih tab "Kerusakan"
2. Lihat total kerusakan per periode
3. Lihat produk dengan kerusakan terbanyak

#### 8. Mengelola User (Admin)

**Tambah User Baru:**
1. Klik menu "Users"
2. Klik "Tambah User"
3. Isi nama, email, password
4. Pilih role (Admin/Kasir)
5. Klik "Simpan"

**Nonaktifkan User:**
1. Klik toggle "Aktif" pada user
2. User tidak bisa login lagi

#### 9. Melihat Audit Log (Admin)

1. Klik menu "Audit Log"
2. Lihat semua aktivitas sistem
3. Filter berdasarkan:
   - User
   - Tanggal
   - Tipe aksi (create/update/delete)
4. Klik detail untuk melihat perubahan data

---

## 📸 Screenshots

### Login Page
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         🧵                                      │
│                    FabricFlow                                   │
│                                                                 │
│              Sistem Manajemen Toko Kain                         │
│                                                                 │
│         ┌─────────────────────────────────────┐                 │
│         │  📧 Email                           │                 │
│         └─────────────────────────────────────┘                 │
│         ┌─────────────────────────────────────┐                 │
│         │  🔒 Password                        │                 │
│         └─────────────────────────────────────┘                 │
│                                                                 │
│         ┌─────────────────────────────────────┐                 │
│         │             MASUK                   │                 │
│         └─────────────────────────────────────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  🧵 FabricFlow                          Admin ▼  🔔  [Logout]   │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  📊 Dash.. │  Selamat Datang, Admin!                           │
│  ────────  │                                                    │
│  🛒 Kasir  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐│
│  📦 Produk │  │💰        │ │📦        │ │🛒        │ │⚠️      ││
│  📈 Stok   │  │Penjualan │ │ Produk   │ │Transaksi │ │Stok    ││
│  🔴 Rusak  │  │Hari Ini  │ │ Aktif    │ │Hari Ini  │ │Menipis ││
│  📋 Trans. │  │Rp 2.5jt  │ │   45     │ │   28     │ │   5    ││
│  📊 Laporan│  └──────────┘ └──────────┘ └──────────┘ └────────┘│
│  ────────  │                                                    │
│  👥 Users  │  Grafik Penjualan Mingguan                        │
│  📝 Audit  │  ┌────────────────────────────────────────────┐   │
│            │  │    ▄                                       │   │
│            │  │    █  ▄     ▄                              │   │
│            │  │ ▄  █  █  ▄  █  ▄                           │   │
│            │  │ █  █  █  █  █  █  ▄                        │   │
│            │  │ Sen Sel Rab Kam Jum Sab Min                │   │
│            │  └────────────────────────────────────────────┘   │
│            │                                                    │
│            │  Transaksi Terakhir                               │
│            │  ┌────────────────────────────────────────────┐   │
│            │  │ TRX-001 │ Rp 150.000 │ Tunai  │ 10:30     │   │
│            │  │ TRX-002 │ Rp 280.000 │ QRIS   │ 10:45     │   │
│            │  │ TRX-003 │ Rp 95.000  │ Tunai  │ 11:02     │   │
│            │  └────────────────────────────────────────────┘   │
└────────────┴────────────────────────────────────────────────────┘
```

### Halaman Produk
```
┌─────────────────────────────────────────────────────────────────┐
│  🧵 FabricFlow                          Admin ▼  🔔  [Logout]   │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  📊 Dash.. │  📦 Daftar Produk                [+ Tambah Produk] │
│  ────────  │                                                    │
│  🛒 Kasir  │  🔍 Cari produk...        Kategori: [Semua ▼]     │
│  📦 Produk │                                                    │
│  📈 Stok   │  ┌─────┬──────────────────┬────────┬───────┬─────┐│
│  🔴 Rusak  │  │Kode │ Nama             │ Harga  │ Stok  │ Aksi││
│  📋 Trans. │  ├─────┼──────────────────┼────────┼───────┼─────┤│
│  📊 Laporan│  │KTN01│ Katun Jepang     │ 75.000 │ 150m  │ ✏️🗑️││
│  ────────  │  │KTN02│ Katun Combed 30s │ 65.000 │ 200m  │ ✏️🗑️││
│  👥 Users  │  │STR01│ Sutra Thailand   │150.000 │  80m  │ ✏️🗑️││
│  📝 Audit  │  │PLY01│ Polyester Premium│ 45.000 │ 300m  │ ✏️🗑️││
│            │  │BTK01│ Batik Pekalongan │120.000 │  50m  │ ✏️🗑️││
│            │  └─────┴──────────────────┴────────┴───────┴─────┘│
│            │                                                    │
│            │  Menampilkan 1-5 dari 45 produk    [< 1 2 3 ... >]│
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

---

## 📅 Timeline Pengerjaan

### Gantt Chart

```
Minggu        │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │
──────────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
Setup Project │███│   │   │   │   │   │   │   │   │
Database      │███│███│   │   │   │   │   │   │   │
Auth System   │   │███│   │   │   │   │   │   │   │
CRUD Produk   │   │███│███│   │   │   │   │   │   │
Sistem Kasir  │   │   │███│███│███│   │   │   │   │
Manajemen Stok│   │   │   │   │███│███│   │   │   │
Kain Rusak    │   │   │   │   │   │███│   │   │   │
Laporan       │   │   │   │   │   │███│███│   │   │
User Mgmt     │   │   │   │   │   │   │███│   │   │
Audit Log     │   │   │   │   │   │   │███│   │   │
Testing       │   │   │   │   │   │   │   │███│   │
Bug Fixing    │   │   │   │   │   │   │   │███│███│
Demo Data     │   │   │   │   │   │   │   │   │███│
──────────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

### Detail Per Fase

| Fase | Minggu | Deliverables |
|------|--------|--------------|
| **Fase 1: Foundation** | 1-2 | Setup project, database schema, authentication |
| **Fase 2: Core Features** | 2-5 | CRUD produk, sistem kasir, transaksi |
| **Fase 3: Stock Management** | 5-6 | Manajemen stok, pencatatan kerusakan |
| **Fase 4: Reporting** | 6-7 | Laporan penjualan, stok, kerusakan |
| **Fase 5: Admin Features** | 7 | User management, audit log |
| **Fase 6: Polish** | 8-9 | Testing, bug fixing, demo data |

---

## 🧪 Testing

### Test Scenarios

#### Authentication
- [ ] Login dengan kredensial valid
- [ ] Login dengan kredensial invalid
- [ ] Logout dan redirect ke login
- [ ] Token expired handling
- [ ] Role-based access control

#### Produk
- [ ] Tambah produk baru
- [ ] Edit produk existing
- [ ] Hapus produk
- [ ] Upload foto produk
- [ ] Search dan filter produk
- [ ] Validasi input (kode unik, harga positif)

#### Transaksi
- [ ] Buat transaksi dengan 1 item
- [ ] Buat transaksi dengan multiple items
- [ ] Transaksi dengan diskon
- [ ] Validasi stok cukup
- [ ] Void transaksi (admin)
- [ ] Generate nomor transaksi unik

#### Stok
- [ ] Lihat stok real-time
- [ ] Adjustment stok masuk
- [ ] Adjustment stok keluar
- [ ] History stok tercatat
- [ ] Alert stok menipis

#### Kain Rusak
- [ ] Catat kerusakan
- [ ] Upload foto kerusakan
- [ ] Stok otomatis berkurang
- [ ] Log tercatat

#### Laporan
- [ ] Laporan penjualan harian
- [ ] Laporan penjualan mingguan
- [ ] Laporan penjualan bulanan
- [ ] Export CSV

---

## 🔒 Security Considerations

### Implemented Security Measures

1. **Password Hashing**
   - Menggunakan bcrypt dengan salt rounds 10
   - Password tidak pernah disimpan plain text

2. **JWT Authentication**
   - Token expire dalam 24 jam
   - Secret key disimpan di environment variable

3. **Input Validation**
   - Semua input divalidasi di backend
   - SQL injection prevention dengan parameterized queries

4. **Role-Based Access Control**
   - Middleware cek role sebelum akses endpoint
   - Frontend hide menu berdasarkan role

5. **CORS Configuration**
   - Hanya allow origin yang terdaftar

### Security Best Practices untuk Production

```
⚠️ CATATAN: Ini adalah aplikasi demo/simulasi.
Untuk production, tambahkan:

- HTTPS/SSL
- Rate limiting
- Request logging
- Input sanitization lebih ketat
- Database encryption
- Regular security audit
- Backup otomatis
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Error: EADDRINUSE: address already in use :::3000

# Solution (Windows):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution (Mac/Linux):
lsof -i :3000
kill -9 <PID>
```

#### 2. Database Locked
```bash
# Error: SQLITE_BUSY: database is locked

# Solution:
# Restart backend server
# Pastikan tidak ada proses lain yang akses database
```

#### 3. CORS Error
```bash
# Error: Access-Control-Allow-Origin

# Solution:
# Pastikan CORS di backend sudah dikonfigurasi
# Cek URL frontend di whitelist
```

#### 4. JWT Token Invalid
```bash
# Error: JsonWebTokenError: invalid token

# Solution:
# Clear localStorage di browser
# Login ulang
```

---

## 📚 Referensi

### Dokumentasi Teknologi

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [JWT.io](https://jwt.io/)

### Design Resources

- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)
- [Tailwind UI Components](https://tailwindui.com/)

---

## 👨‍💻 Kontributor

| Nama | Role | Kontak |
|------|------|--------|
| [Nama Anda] | Full Stack Developer | email@example.com |

---

## 📄 License

```
MIT License

Copyright (c) 2024 FabricFlow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎯 Status Project

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROJECT STATUS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 Planning        [████████████████████] 100%                │
│  🎨 Design          [████████████████████] 100%                │
│  💻 Development     [░░░░░░░░░░░░░░░░░░░░]   0%                │
│  🧪 Testing         [░░░░░░░░░░░░░░░░░░░░]   0%                │
│  🚀 Deployment      [░░░░░░░░░░░░░░░░░░░░]   0%                │
│                                                                 │
│  Overall Progress   [████░░░░░░░░░░░░░░░░]  20%                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

**🧵 FabricFlow**

*Digitalisasi Toko Kain Anda*

Made with ❤️ for Indonesian Fabric Stores

</div>
