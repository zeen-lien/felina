# Bagian 2 - Analisis Masalah & Kebutuhan Sistem (15 poin)

## Kasus: Sistem Berjalan di Toko Kain FabricFlow

Saat ini, toko kain FabricFlow masih menggunakan sistem manual dalam operasionalnya:
- Pencatatan transaksi menggunakan nota kertas dan buku kas
- Stok dicatat di buku stok dengan tulisan tangan
- Laporan penjualan dibuat manual di akhir bulan dengan menghitung nota
- Tidak ada sistem untuk tracking kain rusak/cacat
- Tidak ada audit trail aktivitas karyawan

---

## 1. Identifikasi Masalah Sistem Berjalan

### Masalah 1: Pencatatan Transaksi Manual Rawan Error
**Deskripsi:**
- Kasir harus menghitung manual subtotal, diskon, dan total pembayaran
- Sering terjadi kesalahan perhitungan, terutama saat ramai
- Nota kertas mudah hilang atau rusak
- Sulit mencari riwayat transaksi lama

**Dampak:**
- Kerugian finansial akibat salah hitung
- Komplain pelanggan
- Waktu transaksi lama
- Data transaksi tidak lengkap

### Masalah 2: Manajemen Stok Tidak Real-time
**Deskripsi:**
- Stok dicatat manual di buku setiap ada transaksi atau barang masuk
- Sering lupa update stok setelah transaksi
- Tidak ada notifikasi stok menipis
- Pencatatan kain rusak/cacat tidak terstruktur
- Sulit mengetahui stok real-time tanpa cek fisik

**Dampak:**
- Overselling (jual produk yang stoknya habis)
- Kehilangan penjualan karena tidak tahu stok tersedia
- Stok opname memakan waktu lama
- Kain rusak tidak tercatat dengan baik

### Masalah 3: Laporan Penjualan Lambat dan Tidak Akurat
**Deskripsi:**
- Laporan dibuat manual dengan menghitung nota satu per satu
- Membutuhkan waktu 2-3 hari untuk laporan bulanan
- Tidak ada visualisasi data (grafik, chart)
- Sulit analisis produk terlaris atau slow-moving
- Tidak ada laporan real-time

**Dampak:**
- Pengambilan keputusan bisnis terlambat
- Tidak bisa monitoring performa harian
- Sulit identifikasi tren penjualan
- Perencanaan stok tidak optimal

### Masalah 4: Tidak Ada Kontrol Akses dan Audit Trail
**Deskripsi:**
- Semua karyawan bisa akses semua data
- Tidak ada log aktivitas user
- Tidak bisa tracking siapa yang input/edit data
- Rawan manipulasi data

**Dampak:**
- Risiko keamanan data tinggi
- Sulit investigasi jika ada masalah
- Tidak ada accountability
- Potensi fraud

### Masalah 5: Proses Bisnis Tidak Efisien
**Deskripsi:**
- Banyak proses redundan (tulis nota, input buku kas, update stok)
- Tidak ada standarisasi proses
- Komunikasi antar shift tidak terstruktur
- Dokumentasi proses tidak lengkap

**Dampak:**
- Produktivitas rendah
- Inkonsistensi layanan
- Training karyawan baru lama
- Operasional tidak scalable

---

## 2. Tujuan Sistem Baru

### Tujuan Umum
Mengembangkan Sistem Informasi Manajemen Toko Kain (FabricFlow) yang terintegrasi untuk meningkatkan efisiensi operasional, akurasi data, dan kualitas pengambilan keputusan bisnis.

### Tujuan Khusus

1. **Otomasi Proses Transaksi**
   - Menyediakan sistem POS digital yang cepat dan akurat
   - Perhitungan otomatis subtotal, diskon, dan grand total
   - Generate struk digital instant
   - Simpan riwayat transaksi lengkap

2. **Manajemen Stok Real-time**
   - Update stok otomatis setiap transaksi
   - Notifikasi stok menipis (threshold < 10 meter)
   - Tracking stok masuk/keluar dengan audit log
   - Pencatatan kain rusak terpisah dengan foto bukti

3. **Laporan dan Analisis Komprehensif**
   - Dashboard real-time dengan KPI utama
   - Grafik analisis penjualan (harian, mingguan, bulanan)
   - Laporan produk terlaris dan distribusi stok
   - Export laporan ke PDF/Excel

4. **Kontrol Akses dan Keamanan**
   - Role-based access control (Admin vs Kasir)
   - Autentikasi user dengan password
   - Audit log semua aktivitas user
   - Data encryption

5. **Meningkatkan Efisiensi Operasional**
   - Mengurangi waktu transaksi dari 5 menit menjadi 2 menit
   - Mengurangi error pencatatan hingga 95%
   - Laporan real-time tanpa perlu hitung manual
   - Paperless operation

---

## 3. Batasan Sistem

### Batasan Fungsional

1. **Tidak Menangani Procurement**
   - Sistem tidak mengelola pembelian ke supplier
   - Tidak ada modul purchase order
   - Stok masuk diinput manual oleh admin

2. **Tidak Terintegrasi dengan Sistem Eksternal**
   - Tidak terintegrasi dengan sistem accounting
   - Tidak ada payment gateway online
   - Tidak ada integrasi e-commerce

3. **Tidak Menangani Multi-cabang**
   - Sistem untuk single store
   - Tidak ada sinkronisasi data antar cabang
   - Tidak ada consolidated report multi-cabang

4. **Tidak Ada Modul CRM**
   - Tidak ada manajemen data pelanggan detail
   - Tidak ada loyalty program
   - Tidak ada marketing automation

### Batasan Non-fungsional

1. **Platform**
   - Web-based application (tidak ada mobile app native)
   - Membutuhkan internet browser modern
   - Optimal di desktop/laptop (responsive di mobile)

2. **Data Storage**
   - Menggunakan localStorage untuk demo
   - Kapasitas terbatas (5-10MB per browser)
   - Data tidak tersinkronisasi antar device

3. **Concurrent Users**
   - Maksimal 5 user concurrent (untuk demo)
   - Tidak ada real-time collaboration

4. **Deployment**
   - Hosted di GitHub Pages (static hosting)
   - Tidak ada backend server
   - Tidak ada database server

---

## 4. Spesifikasi Kebutuhan Fungsional

### FR-01: Autentikasi dan Otorisasi
**Deskripsi:** Sistem harus menyediakan mekanisme login untuk user dengan role berbeda (Admin dan Kasir)

**Detail:**
- User dapat login dengan email dan password
- Sistem validasi kredensial
- Session management
- Logout functionality
- Role-based menu access

**Aktor:** Admin, Kasir

**Prioritas:** High (Critical)

---

### FR-02: Manajemen Produk
**Deskripsi:** Admin dapat mengelola data produk kain (CRUD operations)

**Detail:**
- Tambah produk baru (kode, nama, kategori, warna, harga, stok, satuan, foto, deskripsi)
- Edit data produk (kecuali stok - via adjustment)
- Hapus produk
- Lihat daftar produk dengan filter dan search
- Auto-generate kode produk
- Validasi input (harga > 0, stok >= 0)

**Aktor:** Admin

**Prioritas:** High

---

### FR-03: Point of Sale (POS)
**Deskripsi:** Kasir dapat melakukan transaksi penjualan dengan cepat dan akurat

**Detail:**
- Pilih produk dari katalog
- Input jumlah pembelian (meter)
- Tambah ke keranjang
- Edit/hapus item di keranjang
- Input diskon (Rupiah)
- Pilih metode pembayaran (Tunai, Transfer, QRIS, Kartu Kredit)
- Perhitungan otomatis subtotal dan grand total
- Proses transaksi dan generate struk
- Kosongkan keranjang (void)
- Validasi stok tersedia

**Aktor:** Kasir, Admin

**Prioritas:** High (Critical)

---

### FR-04: Manajemen Stok
**Deskripsi:** Admin dapat melakukan adjustment stok dan melihat riwayat perubahan stok

**Detail:**
- Stok adjustment (masuk/keluar) dengan catatan
- Lihat daftar produk dengan status stok
- Lihat riwayat perubahan stok (log)
- Filter riwayat berdasarkan tipe (masuk, keluar, penjualan, rusak, adjustment)
- Notifikasi stok menipis (< 10 meter)
- Update stok otomatis saat transaksi

**Aktor:** Admin

**Prioritas:** High

---

### FR-05: Pencatatan Kain Rusak
**Deskripsi:** User dapat mencatat kain yang rusak/cacat dengan alasan dan foto bukti

**Detail:**
- Pilih produk yang rusak
- Input jumlah rusak (meter)
- Pilih alasan kerusakan (Cacat Produksi, Rusak Saat Penyimpanan, Kesalahan Pemotongan, Terkena Air/Noda, Sobek, Lainnya)
- Upload foto bukti (optional)
- Kurangi stok otomatis
- Lihat riwayat kain rusak
- Generate log stok untuk kain rusak

**Aktor:** Admin, Kasir

**Prioritas:** Medium

---

### FR-06: Manajemen Transaksi
**Deskripsi:** User dapat melihat riwayat transaksi dan detail transaksi

**Detail:**
- Lihat daftar semua transaksi
- Filter berdasarkan status (Selesai, Void)
- Search berdasarkan nomor transaksi atau kasir
- Lihat detail transaksi (items, total, metode bayar, kasir, tanggal)
- Void transaksi (Admin only)
- Auto-generate nomor transaksi (TRX-YYYYMMDD-XXX)

**Aktor:** Admin, Kasir

**Prioritas:** High

---

### FR-07: Dashboard dan Laporan
**Deskripsi:** Sistem menyediakan dashboard dengan KPI dan laporan penjualan

**Detail:**
- Dashboard real-time:
  - Total penjualan hari ini
  - Jumlah transaksi hari ini
  - Total produk
  - Jumlah stok menipis
  - Grafik penjualan 7 hari terakhir
  - Kategori terlaris (bar chart)
  - Transaksi terakhir
  - Performa target
- Laporan penjualan:
  - Grafik penjualan (area chart)
  - Distribusi stok per kategori (pie chart)
  - Produk terlaris (top 5)
  - Target bulanan (radial chart)
  - Filter periode (harian, mingguan, bulanan)
  - Export laporan (simulasi)

**Aktor:** Admin

**Prioritas:** High

---

### FR-08: Manajemen User
**Deskripsi:** Admin dapat mengelola data user (kasir dan admin)

**Detail:**
- Lihat daftar user
- Tambah user baru (nama, email, password, role)
- Edit user (nama, email, role)
- Nonaktifkan user
- Lihat status user (aktif/nonaktif)
- Validasi email unique

**Aktor:** Admin

**Prioritas:** Medium

---

### FR-09: Audit Log
**Deskripsi:** Sistem mencatat semua aktivitas user untuk audit trail

**Detail:**
- Log aktivitas: login, create, update, delete
- Informasi log: user, aksi, tabel, data ID, timestamp, data lama, data baru
- Filter log berdasarkan user atau aksi
- Search log
- Pagination

**Aktor:** Admin

**Prioritas:** Medium

---

## 5. Spesifikasi Kebutuhan Non-fungsional

### NFR-01: Performance (Kinerja)
**Deskripsi:** Sistem harus responsif dan cepat

**Kriteria:**
- Waktu loading halaman < 2 detik
- Waktu proses transaksi < 1 detik
- Waktu generate laporan < 3 detik
- Smooth animation (60 FPS)
- Lazy loading untuk data besar

**Prioritas:** High

---

### NFR-02: Usability (Kemudahan Penggunaan)
**Deskripsi:** Sistem harus mudah digunakan oleh user dengan berbagai tingkat keahlian

**Kriteria:**
- Interface intuitif dan user-friendly
- Konsisten design pattern
- Feedback visual jelas (notifikasi, loading, error)
- Keyboard shortcuts untuk aksi cepat
- Help text dan placeholder informatif
- Responsive design (desktop, tablet, mobile)
- Cyberpunk theme dengan neon effects yang tidak mengganggu readability

**Prioritas:** High

---

### NFR-03: Reliability (Keandalan)
**Deskripsi:** Sistem harus stabil dan dapat diandalkan

**Kriteria:**
- Uptime 99% (kecuali maintenance)
- Error handling yang baik (try-catch, validation)
- Data persistence (localStorage)
- Graceful degradation jika ada error
- Auto-save data
- Backup data otomatis

**Prioritas:** High

---

### NFR-04: Security (Keamanan)
**Deskripsi:** Sistem harus aman dari akses tidak sah dan manipulasi data

**Kriteria:**
- Autentikasi user (email + password)
- Role-based access control
- Session timeout (auto logout)
- Input validation dan sanitization
- XSS protection
- CSRF protection
- Audit log semua aktivitas

**Prioritas:** High

---

### NFR-05: Maintainability (Pemeliharaan)
**Deskripsi:** Sistem harus mudah dipelihara dan dikembangkan

**Kriteria:**
- Kode terstruktur dan modular
- Dokumentasi lengkap (inline comments, README)
- Naming convention konsisten
- Separation of concerns (components, stores, utils)
- Version control (Git)
- Automated deployment (GitHub Actions)

**Prioritas:** Medium

---

### NFR-06: Scalability (Skalabilitas)
**Deskripsi:** Sistem harus dapat dikembangkan untuk kebutuhan masa depan

**Kriteria:**
- Arsitektur modular
- API-ready (mudah migrasi ke backend)
- Component reusable
- State management scalable (Zustand)
- Database schema normalized
- Cloud-ready architecture

**Prioritas:** Medium

---

### NFR-07: Compatibility (Kompatibilitas)
**Deskripsi:** Sistem harus kompatibel dengan berbagai platform dan browser

**Kriteria:**
- Support browser modern (Chrome, Firefox, Safari, Edge)
- Responsive design (desktop, tablet, mobile)
- Cross-platform (Windows, Mac, Linux, Android, iOS)
- Progressive Web App ready
- No plugin required

**Prioritas:** Medium

---

## Kesimpulan

Analisis masalah dan kebutuhan sistem FabricFlow mengidentifikasi 5 masalah utama sistem manual yang berdampak pada efisiensi operasional dan akurasi data. Sistem baru dirancang dengan 9 kebutuhan fungsional utama dan 7 kebutuhan non-fungsional untuk mengatasi masalah tersebut dan memberikan solusi komprehensif untuk manajemen toko kain modern.
