// ==========================
// KONEKSI SUPABASE
// ==========================
const SUPABASE_URL = 'https://nqvhxgourslvraudavvd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zTjCtmbQby70LeGbJhj2fg_KcQ24wLE';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================
// DATA MODUL (materi statis)
// ==========================
const DAFTAR_MODUL = [
  // ===================== JARINGAN =====================
  {
    id: 'jaringan-osi',
    judul: 'Model OSI',
    kategori: 'Jaringan',
    konten: 'Model OSI adalah kerangka berpikir yang membagi proses komunikasi jaringan menjadi 7 lapisan. Tujuannya supaya tiap lapisan punya tugas sendiri, sehingga saat ada masalah kita bisa mengecek lapisan mana yang bermasalah. Model ini dibuat oleh ISO pada tahun 1984.\n\nLapisan dari atas ke bawah:\n7. Application: lapisan yang paling dekat dengan pengguna. Contoh protokol: HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP.\n6. Presentation: mengurus format data, enkripsi, dan kompresi. Contoh: SSL/TLS, JPEG, MPEG, ASCII.\n5. Session: membuka, menjaga, dan menutup sesi komunikasi antara dua perangkat. Contoh: NetBIOS, RPC.\n4. Transport: mengatur pengiriman data dari ujung ke ujung, termasuk nomor port. Protokolnya TCP dan UDP. Data di lapisan ini disebut segment.\n3. Network: menentukan jalur pengiriman lewat alamat IP. Perangkatnya router. Data di lapisan ini disebut packet.\n2. Data Link: pengiriman antar perangkat dalam satu jaringan lokal lewat alamat MAC. Perangkatnya switch dan bridge. Data di lapisan ini disebut frame.\n1. Physical: mengubah data menjadi bit dan mengirimnya lewat kabel, sinyal, atau gelombang radio. Perangkatnya kabel, hub, dan repeater.\n\nCara mengingat dari atas ke bawah: All People Seem To Need Data Processing\nCara mengingat dari bawah ke atas: Please Do Not Throw Sausage Pizza Away\n\nContoh: saat kamu membuka website, data dari browser (Application) dibungkus lapis demi lapis. Setiap lapisan menambahkan header berisi informasinya sendiri, proses ini disebut encapsulation. Di sisi penerima, header dibuka satu per satu dari bawah ke atas, proses ini disebut decapsulation.\n\nAnalogi: bayangkan mengirim paket kado. Isinya dibungkus kertas, lalu dikasih kardus, lalu dimasukkan ke kantong pengiriman. Penerima membuka dari lapisan luar sampai isinya ketemu.\n\nTips: saat troubleshooting, mulai dari lapisan paling bawah. Kalau kabel sudah tersambung dan lampu port menyala tapi internet tidak bisa diakses, lanjutkan ke pengecekan IP, lalu DNS.\n\nPerhatian: OSI adalah model teori untuk belajar dan memecahkan masalah. Di praktik, internet memakai model TCP/IP yang hanya punya 4 lapisan.\n\nLatihan: sebuah PC bisa di-ping ke alamat IP, tapi tidak bisa membuka nama website. Masalahnya ada di lapisan mana? Jawabannya Application, tepatnya di DNS.'
  },
  {
    id: 'jaringan-tcpip',
    judul: 'Model TCP/IP dan Perbedaan TCP vs UDP',
    kategori: 'Jaringan',
    konten: 'TCP/IP adalah model yang benar-benar dipakai di internet. Model ini dikembangkan dari riset ARPANET yang didanai Departemen Pertahanan Amerika, dan hanya punya 4 lapisan.\n\nLapisan dari atas ke bawah:\n4. Application: berisi aplikasi yang langsung dipakai pengguna. Gabungan dari Application, Presentation, dan Session di OSI. Protokolnya HTTP, HTTPS, FTP, SMTP, DNS, dan DHCP.\n3. Transport: mengatur pengiriman data antar aplikasi lewat port. Protokolnya TCP dan UDP. Setara dengan Transport di OSI.\n2. Internet: menentukan alamat dan jalur pengiriman. Protokolnya IP dan ICMP. Setara dengan Network di OSI.\n1. Network Access: mengurus cara data dikirim lewat media fisik dan alamat MAC. Protokolnya ARP dan Ethernet. Gabungan dari Physical dan Data Link di OSI.\n\nPerbedaan utama: OSI adalah model teori yang bagus untuk belajar dan memecahkan masalah, sedangkan TCP/IP adalah model yang dipakai dalam praktik di internet.\n\nTCP dan UDP:\n- TCP (Transmission Control Protocol): berbasis koneksi dan andal. Data dijamin sampai dan urutannya benar. Kalau ada paket hilang, data dikirim ulang. Lebih lambat karena ada proses tambahan. Contoh pemakaian: web (HTTP dan HTTPS), email, dan transfer file (FTP).\n- UDP (User Datagram Protocol): tanpa koneksi dan tanpa jaminan. Lebih cepat dan ringan karena tidak ada proses kirim ulang. Contoh pemakaian: streaming video, game online, DNS, dan VoIP.\n\nCara kerja TCP disebut three-way handshake:\n1. SYN: pengirim meminta untuk membuka koneksi.\n2. SYN-ACK: penerima menyetujui dan membalas permintaan itu.\n3. ACK: pengirim mengonfirmasi, lalu koneksi siap dipakai.\n\nAnalogi: TCP seperti kurir yang meminta tanda terima dan mengirim ulang paket yang hilang. UDP seperti melempar surat tanpa tanda terima. Cepat, tapi ada kemungkinan hilang.\n\nTips: untuk aplikasi yang tidak boleh kehilangan data, seperti transfer file, pakai TCP. Untuk aplikasi yang lebih mementingkan kecepatan, seperti game atau streaming, UDP biasanya lebih cocok.\n\nLatihan: kenapa streaming video lebih sering memakai UDP? Jawabannya karena yang penting adalah data tetap mengalir cepat. Frame yang hilang tidak perlu dikirim ulang, karena gambar sudah berganti.'
  },
  {
    id: 'jaringan-ip',
    judul: 'Pengalamatan IP dan Subnetting',
    kategori: 'Jaringan',
    konten: 'IPv4 adalah alamat logika yang dipakai untuk mengidentifikasi perangkat di jaringan. Panjangnya 32 bit, dibagi menjadi 4 oktet (masing-masing 8 bit), dan ditulis dalam bilangan desimal, contohnya 192.168.1.10. Setiap oktet nilainya antara 0 sampai 255.\n\nSetiap alamat IP terdiri dari dua bagian: bagian network yang menunjukkan jaringan mana, dan bagian host yang menunjukkan perangkat ke berapa di jaringan itu. Subnet mask menentukan batas antara keduanya.\n\nKelas alamat (cara lama, tapi tetap penting untuk dipelajari):\n- Kelas A: 1 sampai 126, default mask 255.0.0.0 (/8)\n- Kelas B: 128 sampai 191, default mask 255.255.0.0 (/16)\n- Kelas C: 192 sampai 223, default mask 255.255.255.0 (/24)\n- Kelas D: 224 sampai 239, dipakai untuk multicast\n- Kelas E: 240 sampai 255, dicadangkan untuk keperluan penelitian\n\nAlamat private (tidak bisa langsung diakses dari internet, dipakai di rumah dan kantor):\n- 10.0.0.0 sampai 10.255.255.255\n- 172.16.0.0 sampai 172.31.255.255\n- 192.168.0.0 sampai 192.168.255.255\n\nAlamat khusus:\n- 127.0.0.1: loopback, dipakai untuk mengetes jaringan di perangkat sendiri (localhost).\n- 169.254.x.x (APIPA): muncul saat perangkat gagal mendapat IP dari DHCP.\n- 0.0.0.0: alamat yang dipakai saat perangkat belum punya IP.\n\nNotasi CIDR: /24 berarti 24 bit pertama adalah bagian network, sisanya bagian host. Mask /24 sama dengan 255.255.255.0.\n\nRumus jumlah host yang bisa dipakai: 2^n - 2, dengan n adalah jumlah bit host. Dikurangi 2 karena alamat pertama dipakai sebagai alamat network dan alamat terakhir dipakai sebagai alamat broadcast.\n\nContoh /24: bit host ada 8, jadi 2^8 - 2 = 254 host.\nContoh /26: bit host ada 6, jadi 2^6 - 2 = 62 host. Alamat network 192.168.1.0, host dari 192.168.1.1 sampai 192.168.1.62, dan broadcast 192.168.1.63. Subnet berikutnya mulai dari 192.168.1.64.\n\nLangkah subnetting cepat:\n1. Tentukan jumlah host yang dibutuhkan.\n2. Cari n terkecil yang membuat 2^n - 2 lebih besar atau sama dengan jumlah host.\n3. Mask = 32 dikurangi n. Misalnya n = 6, maka mask-nya /26.\n4. Ukuran blok = 256 dikurangi nilai oktet mask yang tidak penuh.\n\nContoh: butuh 30 host. 2^5 - 2 = 30, jadi n = 5, mask /27 (32 - 5), dan ukuran blok 32.\n\nLatihan: alamat 192.168.1.130 dengan /25 berada di network mana? Jawabannya 192.168.1.128, karena blok /25 berukuran 128 alamat dan 130 ada di rentang 128 sampai 255.\n\nPerhatian: alamat network dan broadcast tidak boleh dipasang ke perangkat. Dua perangkat hanya bisa berkomunikasi langsung kalau berada di subnet yang sama.'
  },
  {
    id: 'jaringan-perangkat',
    judul: 'Perangkat Jaringan dan Kabel',
    kategori: 'Jaringan',
    konten: 'Perangkat jaringan adalah alat yang menghubungkan perangkat dan mengatur lalu lintas data. Setiap perangkat bekerja di lapisan OSI tertentu, dan ini penting diingat saat troubleshooting.\n\nDaftar perangkat dan fungsinya:\n- Modem: mengubah sinyal dari ISP (misalnya fiber atau ADSL) menjadi data yang bisa dipakai jaringan lokal. Bekerja di Layer 1.\n- Repeater: menguatkan sinyal yang melemah supaya jarak kabel bisa lebih jauh. Bekerja di Layer 1.\n- Hub: menyambungkan banyak perangkat, tapi data dikirim ke semua port (broadcast). Boros dan lambat, sekarang sudah jarang dipakai. Bekerja di Layer 1.\n- Bridge: menghubungkan dua segmen jaringan dan memfilter data berdasarkan alamat MAC. Bekerja di Layer 2.\n- Switch: meneruskan data hanya ke port tujuan berdasarkan alamat MAC, sehingga lebih cepat dari hub. Bekerja di Layer 2.\n- Router: menghubungkan beberapa jaringan dan menentukan jalur terbaik lewat alamat IP. Bekerja di Layer 3.\n- Access Point: memancarkan sinyal WiFi supaya perangkat nirkabel bisa terhubung ke jaringan kabel. Bekerja di Layer 1 dan 2.\n- Firewall: menyaring lalu lintas data berdasarkan aturan keamanan.\n- Gateway: pintu keluar dari satu jaringan ke jaringan lain yang berbeda protokol atau arsitekturnya.\n\nDi rumah, satu perangkat biasanya menggabungkan beberapa fungsi sekaligus. Contohnya router WiFi yang sudah berisi modem, switch, access point, dan firewall dalam satu kotak.\n\nPerbedaan hub dan switch: hub mengirim data ke semua port, sedangkan switch hanya mengirim ke port tujuan. Itu sebabnya switch lebih efisien dan lebih aman.\n\nJenis kabel jaringan:\n- UTP (Unshielded Twisted Pair): paling umum dipakai. Cat5e cukup untuk 1 Gbps, Cat6 lebih baik untuk kecepatan dan gangguan. Panjang maksimal 100 meter.\n- STP (Shielded Twisted Pair): mirip UTP tapi ada pelindung, cocok untuk lingkungan dengan banyak gangguan listrik.\n- Fiber optic: memakai cahaya, bisa untuk jarak sangat jauh, dan kebal gangguan listrik. Biasanya dipakai untuk tulang punggung jaringan dan koneksi ISP.\n- Koaksial: kabel tembaga tunggal, dipakai untuk TV kabel dan sebagian jaringan ISP lama.\n\nKonektor yang dipakai di kabel UTP disebut RJ-45, dengan 8 pin.\n\nUrutan warna kabel:\n- T568B: putih-oranye, oranye, putih-hijau, biru, putih-biru, hijau, putih-coklat, coklat.\n- T568A: putih-hijau, hijau, putih-oranye, biru, putih-biru, oranye, putih-coklat, coklat.\n\nKabel straight dipakai untuk menghubungkan PC ke switch atau router, dengan urutan kedua ujung sama. Kabel cross dipakai untuk menghubungkan dua perangkat sejenis, misalnya PC ke PC atau switch ke switch, dengan urutan ujung berbeda. Banyak perangkat sekarang punya fitur auto-MDIX yang menyesuaikan sendiri, jadi kabel straight hampir selalu bisa dipakai.\n\nTips: kalau lampu indikator port tidak menyala, cek dulu kabel dan konektornya. Coba ganti dengan kabel yang sudah pasti baik untuk memastikan sumber masalahnya.\n\nAnalogi: switch itu seperti resepsionis yang mengantar surat langsung ke meja tujuan. Hub seperti pengumuman yang dibacakan ke seluruh ruangan.\n\nLatihan: PC kamu terhubung ke switch dan lampu port menyala, tapi PC tidak mendapat IP dari router. Apa yang dicek pertama? Jawabannya kabel dan port dulu, lalu pengaturan DHCP di router.'
  },

  // ===================== PEMROGRAMAN =====================
  {
    id: 'prog-variabel',
    judul: 'Variabel dan Tipe Data',
    kategori: 'Pemrograman',
    konten: 'Variabel adalah tempat menyimpan nilai yang bisa diubah selama program berjalan. Bayangkan seperti kotak yang diberi label, isinya boleh diganti kapan saja.\n\nContoh di Python:\nnama = "Budi"\numur = 17\nnilai_rata = 85.5\nsudah_lulus = True\n\nTipe data dasar:\n- int: bilangan bulat, contoh 17\n- float: bilangan desimal, contoh 85.5\n- str: teks, contoh "Budi"\n- bool: nilai benar atau salah, yaitu True atau False\n\nUntuk mengecek tipe data, pakai fungsi type():\nprint(type(umur))\n\nKonversi tipe data:\nangka = int("17")\nteks = str(17)\n\nVariabel juga bisa dipakai untuk menghitung:\ntotal = 5000 * 3\nprint(total)\n\nAnalogi: variabel seperti label di kotak. Label "umur" menempel pada isi 17. Kalau isinya diganti jadi 18, labelnya tetap sama.\n\nTips: beri nama variabel yang deskriptif dengan huruf kecil dan garis bawah, misalnya nilai_akhir, bukan x atau data1.\n\nPerhatian: Python membedakan huruf besar dan kecil. nama, Nama, dan NAMA adalah tiga variabel yang berbeda.\n\nLatihan: apa tipe data dari nilai 3.14? Jawabannya float, karena ada bagian desimal.\n\nCara mengingat: int untuk bilangan bulat (integer), float untuk bilangan desimal (floating point).'
  },
  {
    id: 'prog-kondisi',
    judul: 'Percabangan (if, elif, else)',
    kategori: 'Pemrograman',
    konten: 'Percabangan dipakai untuk memilih aksi berdasarkan kondisi. Program mengecek kondisi dari atas ke bawah, menjalankan blok pertama yang bernilai benar, lalu berhenti mengecek sisanya.\n\nContoh:\nnilai = 72\nif nilai >= 75:\n    print("Lulus dengan baik")\nelif nilai >= 60:\n    print("Remedial")\nelse:\n    print("Tidak lulus")\n\nKata kunci:\n- if: kondisi pertama\n- elif: kondisi tambahan, singkatan dari else if\n- else: dijalankan kalau semua kondisi di atasnya salah\n\nOperator perbandingan:\n- == sama dengan\n- != tidak sama dengan\n- >, <, >=, <= lebih besar, lebih kecil, lebih besar atau sama, lebih kecil atau sama\n\nOperator logika:\n- and: keduanya harus benar\n- or: salah satu saja sudah cukup\n- not: membalik nilai benar menjadi salah\n\nContoh gabungan:\numur = 17\nsudah_daftar = True\nif umur >= 17 and sudah_daftar:\n    print("Boleh ikut")\n\nPerhatian: indentasi (spasi di awal baris) harus konsisten, biasanya 4 spasi. Kalau salah, Python akan menampilkan IndentationError.\n\nPerhatian: tanda = dipakai untuk mengisi nilai, sedangkan == dipakai untuk membandingkan. Keduanya sering tertukar oleh pemula.\n\nLatihan: tulis kondisi untuk mengecek apakah angka berada di antara 1 sampai 10. Jawabannya: if angka >= 1 and angka <= 10.'
  },
  {
    id: 'prog-perulangan',
    judul: 'Perulangan (for dan while)',
    kategori: 'Pemrograman',
    konten: 'Perulangan dipakai untuk menjalankan blok kode berkali-kali tanpa harus menulisnya ulang.\n\nFor loop, dipakai kalau jumlah pengulangan sudah diketahui:\nfor i in range(1, 6):\n    print("Pengulangan ke", i)\n\nrange(1, 6) menghasilkan angka 1, 2, 3, 4, 5. Angka akhir tidak ikut.\n\nRange dengan langkah (step):\nfor i in range(0, 10, 2):\n    print(i)\n\nHasilnya 0, 2, 4, 6, 8.\n\nWhile loop, dipakai selama kondisi masih benar:\nhitung = 1\nwhile hitung <= 3:\n    print("Hitungan:", hitung)\n    hitung += 1\n\nKontrol loop:\n- break: keluar dari loop sekarang juga\n- continue: lewati sisa blok dan lanjut ke pengulangan berikutnya\n\nContoh break:\nfor angka in range(1, 10):\n    if angka == 4:\n        break\n    print(angka)\n\nHasilnya hanya menampilkan 1, 2, 3.\n\nPerhatian: hati-hati dengan infinite loop. Kalau kondisi while tidak pernah salah, program akan terus berjalan. Pastikan ada perubahan nilai di dalam loop, seperti hitung += 1.\n\nTips: for lebih aman dipakai untuk jumlah pengulangan yang jelas, sedangkan while cocok untuk kondisi yang belum tentu berapa kali terjadi.\n\nLatihan: tulis for untuk menampilkan angka 1 sampai 5. Jawabannya range(1, 6), karena angka akhir tidak ikut.'
  },
  {
    id: 'prog-fungsi',
    judul: 'Fungsi',
    kategori: 'Pemrograman',
    konten: 'Fungsi adalah blok kode yang diberi nama supaya bisa dipanggil berulang kali. Fungsi membuat kode lebih rapi, lebih mudah dibaca, dan lebih mudah diperbaiki karena cukup diubah di satu tempat.\n\nContoh:\ndef tambah(a, b):\n    return a + b\n\nhasil = tambah(5, 3)\nprint(hasil)\n\nHasilnya 8.\n\nIstilah penting:\n- Parameter: variabel di dalam tanda kurung saat fungsi dibuat, yaitu a dan b di contoh atas.\n- Argumen: nilai yang dikirim saat fungsi dipanggil, yaitu 5 dan 3 di contoh atas.\n- Return: nilai yang dikembalikan fungsi ke bagian program yang memanggilnya.\n\nFungsi tanpa return hanya menjalankan perintah dan tidak mengembalikan nilai.\n\nContoh fungsi pengecek bilangan genap:\ndef cek_genap(n):\n    if n % 2 == 0:\n        return True\n    return False\n\nprint(cek_genap(7))\n\nHasilnya False, karena 7 tidak habis dibagi 2.\n\nTanda % adalah operator modulo, yaitu sisa bagi. Contohnya 7 % 2 hasilnya 1.\n\nNilai default: parameter bisa diberi nilai awal. Misalnya def sapa(nama="Tamu") akan menampilkan "Halo, Tamu" kalau dipanggil tanpa argumen, dan "Halo, Budi" kalau dipanggil dengan sapa("Budi").\n\nAnalogi: fungsi seperti mesin kopi. Kamu memasukkan bahan (argumen), mesin memprosesnya, lalu mengeluarkan hasil (return).\n\nTips: nama fungsi sebaiknya pakai huruf kecil dan garis bawah, sama seperti variabel.\n\nLatihan: buat fungsi luas_persegi(sisi) yang mengembalikan sisi * sisi. Lalu panggil dengan sisi 4 dan tampilkan hasilnya. Jawabannya 16.'
  },

  // ===================== SISTEM OPERASI =====================
  {
    id: 'so-linux-dasar',
    judul: 'Perintah Dasar Linux',
    kategori: 'Sistem Operasi',
    konten: 'Linux banyak dipakai di server dan perangkat jaringan, jadi penting banget dikuasai. Semua perintah di bawah dijalankan di terminal.\n\nNavigasi dan melihat isi folder:\n- pwd: menampilkan lokasi folder sekarang\n- ls: melihat isi folder\n- ls -la: melihat isi folder beserta detailnya dan file tersembunyi\n- cd nama_folder: pindah ke folder tersebut\n- cd ..: naik satu level ke folder induk\n- cd ~: pindah ke folder home\n\nMembuat, menyalin, dan menghapus:\n- mkdir nama_folder: membuat folder baru\n- touch file.txt: membuat file kosong\n- cp asal tujuan: menyalin file\n- mv asal tujuan: memindahkan atau mengganti nama file\n- rm file.txt: menghapus file, hati-hati karena tidak ada tempat sampah\n- rm -r nama_folder: menghapus folder beserta isinya\n- cat file.txt: menampilkan isi file\n\nJaringan:\n- ip a: melihat alamat IP semua interface\n- ping -c 4 8.8.8.8: mengecek koneksi ke server lain sebanyak 4 kali\n- sudo apt update: memperbarui daftar paket di Ubuntu atau Debian\n\nHak akses file:\nSetiap file punya izin untuk pemilik, grup, dan pengguna lain. Huruf r artinya read (nilai 4), w artinya write (nilai 2), dan x artinya execute (nilai 1). Angka 755 berarti pemilik punya rwx (7), grup punya r-x (5), dan pengguna lain punya r-x (5).\n\n- chmod 755 script.sh: mengatur izin file sesuai angka\n- chmod +x script.sh: membuat file bisa dijalankan\n- sudo: menjalankan perintah sebagai administrator\n\nContoh alur kerja:\n    mkdir latihan\n    cd latihan\n    touch catatan.txt\n    ls -la\n\nTips: tekan tombol Tab untuk melengkapi nama file secara otomatis, dan tombol panah atas untuk melihat perintah sebelumnya. Ctrl + C menghentikan perintah yang sedang berjalan.\n\nPerhatian: rm -rf menghapus paksa tanpa konfirmasi. Jangan dijalankan sembarangan, terutama dengan path yang belum kamu cek.\n\nLatihan: buat folder bernama tugas, masuk ke dalamnya, lalu buat file laporan.txt. Jawabannya: mkdir tugas, cd tugas, touch laporan.txt.'
  },

  // ===================== KEAMANAN =====================
  {
    id: 'keamanan-dasar',
    judul: 'Dasar Keamanan Jaringan',
    kategori: 'Keamanan',
    konten: 'Keamanan jaringan menjaga tiga hal utama yang disebut CIA:\n- Confidentiality (kerahasiaan): data hanya bisa diakses pihak yang berhak. Contohnya enkripsi.\n- Integrity (integritas): data tidak diubah tanpa izin. Contohnya checksum dan tanda tangan digital.\n- Availability (ketersediaan): layanan tetap bisa diakses saat dibutuhkan. Contohnya server cadangan dan perlindungan dari serangan DDoS.\n\nCara mengingat: CIA adalah tiga pilar keamanan. Kalau salah satu hilang, keamanan sistem ikut goyah.\n\nAnalogi: CIA seperti brankas. Kerahasiaan adalah kunci yang hanya dipegang orang yang berhak, integritas adalah segel yang tidak boleh rusak, dan ketersediaan adalah jam buka brankas saat dibutuhkan.\n\nPerlindungan dasar:\n- Firewall: menyaring lalu lintas masuk dan keluar berdasarkan aturan.\n- WPA2 atau WPA3: pengamanan WiFi. Hindari WEP karena sudah mudah ditembus.\n- Password kuat: panjang, campuran huruf besar, huruf kecil, angka, dan simbol. Jangan dipakai ulang di banyak tempat.\n- Two-factor authentication (2FA): login butuh kode tambahan, misalnya dari aplikasi di HP.\n- VPN: membuat terowongan terenkripsi saat terhubung ke jaringan publik.\n- HTTPS: memastikan komunikasi dengan website terenkripsi. Tanda gemboknya ada di address bar.\n- Update rutin: menutup celah keamanan yang sudah diketahui.\n\nJenis serangan yang perlu dikenali:\n- Phishing: penipuan lewat email atau pesan palsu untuk mencuri data login.\n- Brute force: mencoba banyak kombinasi password sampai ketemu.\n- Sniffing: menyadap data yang lewat di jaringan yang tidak terenkripsi.\n- Malware: program berbahaya seperti virus, ransomware, dan trojan.\n- DDoS: membanjiri server dengan lalu lintas palsu sampai tidak bisa diakses.\n- Man-in-the-middle: penyerang berada di tengah dan diam-diam membaca atau mengubah data.\n\nTips: aktifkan 2FA di akun penting seperti email dan media sosial. Ini langkah paling sederhana tapi paling berguna.\n\nPerhatian: mempelajari keamanan itu boleh dan memang penting, tapi mencoba menyerang jaringan orang lain tanpa izin melanggar hukum (UU ITE). Latihan sebaiknya dilakukan di lab sendiri atau platform latihan yang memang disediakan untuk itu.\n\nLatihan: sebuah email meminta kamu login lewat link di dalamnya, tapi alamat pengirimnya terlihat aneh. Itu tanda apa? Jawabannya tanda phishing, jadi jangan klik link-nya.'
  }
];

// ==========================
// VARIABEL GLOBAL
// ==========================
let moduleAktif = null;

// ==========================
// UTILITAS
// ==========================
function ambilSiswa() {
  return {
    nama: localStorage.getItem('namaSiswa'),
    kelas: localStorage.getItem('kelasSiswa')
  };
}

function formatWaktu(isoString) {
  return new Date(isoString).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

// ==========================
// TAMPILAN MODUL
// ==========================
function esc(teks) {
  return teks
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function kategoriSlug(kategori) {
  return kategori.toLowerCase().replace(/\s+/g, '-');
}

// Kata pembuka yang akan diberi kotak warna
const CALLOUT = [
  { kata: 'Contoh', kelas: 'callout-contoh' },
  { kata: 'Tips', kelas: 'callout-tips' },
  { kata: 'Analogi', kelas: 'callout-tips' },
  { kata: 'Perhatian', kelas: 'callout-bahaya' },
  { kata: 'Catatan penting', kelas: 'callout-bahaya' },
  { kata: 'Latihan', kelas: 'callout-latihan' },
  { kata: 'Cara mengingat', kelas: 'callout-ingat' }
];

function kelasCallout(baris) {
  const hit = CALLOUT.find(c => baris.startsWith(c.kata));
  return hit ? hit.kelas : null;
}

// Menentukan jenis setiap baris teks
function jenisBaris(baris) {
  if (baris.trim() === '') return 'kosong';
  if (/^\s*- /.test(baris)) return 'ul';
  if (/^\d+\. /.test(baris)) return 'ol';
  if (/^(\s{2,}|\t)/.test(baris)) return 'kode';
  if (/^(def|if|elif|else:|for|while|return|print|break|continue)\b/.test(baris)) return 'kode';
  if (/^[a-z_]+\s*(=|\+=)/.test(baris)) return 'kode';
  if (kelasCallout(baris)) return 'callout';
  return 'teks';
}

// Membuat "Label: isi" menjadi label yang dicetak tebal
function formatItem(teks) {
  const m = teks.match(/^([^:]{1,40}):\s(.*)$/);
  if (m) return `<strong>${esc(m[1])}:</strong> ${esc(m[2])}`;
  return esc(teks);
}

// Mengubah teks modul biasa menjadi HTML yang berwarna dan rapi
function formatKonten(teks) {
  const hasil = [];
  let grup = null;

  const tutup = () => {
    const g = grup;
    grup = null;
    if (!g) return;

    const isi = g.baris;

    if (g.tipe === 'ul') {
      hasil.push('<ul>' + isi.map(b => `<li>${formatItem(b.replace(/^\s*- /, ''))}</li>`).join('') + '</ul>');
    } else if (g.tipe === 'ol') {
      const awal = parseInt(isi[0], 10);
      const akhir = parseInt(isi[isi.length - 1], 10);
      const mundur = awal > akhir ? ' reversed' : '';
      hasil.push(`<ol start="${awal}"${mundur}>` + isi.map(b => `<li>${formatItem(b.replace(/^\d+\. /, ''))}</li>`).join('') + '</ol>');
    } else if (g.tipe === 'kode') {
      hasil.push('<pre class="kode"><code>' + esc(isi.join('\n')) + '</code></pre>');
    } else {
      hasil.push('<p>' + esc(isi.join(' ')) + '</p>');
    }
  };

  for (const baris of teks.split('\n')) {
    const tipe = jenisBaris(baris);

    if (tipe === 'kosong') {
      tutup();
      continue;
    }

    if (tipe === 'callout') {
      tutup();
      hasil.push(`<div class="callout ${kelasCallout(baris)}">${esc(baris)}</div>`);
      continue;
    }

    if (!grup || grup.tipe !== tipe) {
      tutup();
      grup = { tipe, baris: [] };
    }
    grup.baris.push(baris);
  }

  tutup();
  return hasil.join('');
}

// ==========================
// HALAMAN LOGIN (index.html)
// ==========================
function initLogin() {
  // Kalau sudah login, langsung ke dashboard
  if (localStorage.getItem('namaSiswa')) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('formLogin');
  const pesan = document.getElementById('pesanLogin');
  const tombol = form.querySelector('button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('inputNama').value.trim();
    const kelas = document.getElementById('inputKelas').value.trim().toUpperCase();

    if (!nama || !kelas) {
      pesan.textContent = 'Nama dan kelas wajib diisi.';
      pesan.className = 'pesan error';
      return;
    }

    tombol.disabled = true;
    pesan.textContent = 'Memproses...';
    pesan.className = 'pesan';

    const { error } = await sb.from('students').insert({ nama, kelas });

    if (error) {
      pesan.textContent = 'Gagal masuk: ' + error.message;
      pesan.className = 'pesan error';
      tombol.disabled = false;
      return;
    }

    localStorage.setItem('namaSiswa', nama);
    localStorage.setItem('kelasSiswa', kelas);
    window.location.href = 'dashboard.html';
  });
}

// ==========================
// HALAMAN DASHBOARD (dashboard.html)
// ==========================
function initDashboard() {
  const { nama, kelas } = ambilSiswa();

  // Belum login? Balik ke halaman login
  if (!nama) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('namaUser').textContent = nama;
  document.getElementById('kelasUser').textContent = kelas;

  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('namaSiswa');
    localStorage.removeItem('kelasSiswa');
    window.location.href = 'index.html';
  });

  renderDaftarModul();
  setupFormKomentar();
  setupFormSaran();
  mulaiRealtime();
  bukaModul(DAFTAR_MODUL[0].id);
}

// Membuat tombol-tombol modul di sidebar, dikelompokkan per kategori
function renderDaftarModul() {
  const wadah = document.getElementById('daftarModul');
  wadah.innerHTML = '';

  const kategoriList = [...new Set(DAFTAR_MODUL.map(m => m.kategori))];

  kategoriList.forEach(kategori => {
    const judulKategori = document.createElement('h3');
    judulKategori.textContent = kategori;
    wadah.appendChild(judulKategori);

    DAFTAR_MODUL
      .filter(m => m.kategori === kategori)
      .forEach(m => {
        const tombol = document.createElement('button');
        tombol.className = 'btn-modul';
        tombol.dataset.id = m.id;
        tombol.textContent = m.judul;
        tombol.addEventListener('click', () => bukaModul(m.id));
        wadah.appendChild(tombol);
      });
  });
}

// Menampilkan isi modul yang dipilih dan memuat komentarnya
function bukaModul(id) {
  const modul = DAFTAR_MODUL.find(m => m.id === id);
  if (!modul) return;

  moduleAktif = id;

  document.querySelectorAll('.btn-modul').forEach(btn => {
    btn.classList.toggle('aktif', btn.dataset.id === id);
  });

  const badge = document.getElementById('kategoriModul');
  badge.textContent = modul.kategori;
  badge.className = 'badge badge-' + kategoriSlug(modul.kategori);

  document.getElementById('judulModul').textContent = modul.judul;
  document.getElementById('kontenModul').innerHTML = formatKonten(modul.konten);

  muatKomentar(id);
}

// Mengambil komentar lama dari database
async function muatKomentar(moduleId) {
  const wadah = document.getElementById('listKomentar');
  wadah.innerHTML = '<p class="info">Memuat komentar...</p>';

  const { data, error } = await sb
    .from('comments')
    .select('*')
    .eq('module_id', moduleId)
    .order('created_at', { ascending: true });

  // Kalau siswa sudah pindah modul saat data masih dimuat, abaikan
  if (moduleAktif !== moduleId) return;

  wadah.innerHTML = '';

  if (error) {
    console.error('Gagal memuat komentar:', error);
    wadah.innerHTML = '<p class="info">Gagal memuat komentar.</p>';
    return;
  }

  if (data.length === 0) {
    wadah.innerHTML = '<p class="info">Belum ada komentar. Jadilah yang pertama!</p>';
    return;
  }

  data.forEach(k => tampilKomentar(k));
}

// Menambahkan satu komentar ke layar
function tampilKomentar(k) {
  const wadah = document.getElementById('listKomentar');

  // Hindari komentar dobel (dari insert sendiri + event realtime)
  if (wadah.querySelector(`[data-id="${k.id}"]`)) return;

  // Hapus teks "belum ada komentar" kalau ada
  const info = wadah.querySelector('.info');
  if (info) info.remove();

  const item = document.createElement('div');
  item.className = 'komentar';
  item.dataset.id = k.id;

  const header = document.createElement('div');
  header.className = 'komentar-header';

  const namaEl = document.createElement('strong');
  namaEl.textContent = k.nama;

  const waktu = document.createElement('small');
  waktu.textContent = formatWaktu(k.created_at);

  header.append(namaEl, waktu);

  const isi = document.createElement('p');
  isi.textContent = k.isi;

  item.append(header, isi);
  wadah.appendChild(item);
  wadah.scrollTop = wadah.scrollHeight;
}

// Form kirim komentar
function setupFormKomentar() {
  const form = document.getElementById('formKomentar');
  const input = document.getElementById('isiKomentar');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isi = input.value.trim();
    if (!isi || !moduleAktif) return;

    const { nama } = ambilSiswa();
    const moduleSaatIni = moduleAktif;

    const { data, error } = await sb
      .from('comments')
      .insert({ module_id: moduleSaatIni, nama, isi })
      .select()
      .single();

    if (error) {
      alert('Gagal mengirim komentar: ' + error.message);
      return;
    }

    input.value = '';

    if (data.module_id === moduleAktif) {
      tampilKomentar(data);
    }
  });
}

// Realtime: komentar baru dari siswa lain langsung muncul
function mulaiRealtime() {
  sb.channel('komentar-live')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'comments' },
      (payload) => {
        if (payload.new.module_id === moduleAktif) {
          tampilKomentar(payload.new);
        }
      }
    )
    .subscribe();
}

// Form kotak saran
function setupFormSaran() {
  const form = document.getElementById('formSaran');
  const input = document.getElementById('isiSaran');
  const pesan = document.getElementById('pesanSaran');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isi = input.value.trim();
    if (!isi) return;

    const { nama } = ambilSiswa();

    const { error } = await sb
      .from('suggestions')
      .insert({ nama, isi });

    if (error) {
      pesan.textContent = 'Gagal mengirim saran: ' + error.message;
      pesan.className = 'pesan error';
      return;
    }

    input.value = '';
    pesan.textContent = 'Terima kasih! Saranmu sudah tersimpan.';
    pesan.className = 'pesan sukses';
  });
}

// ==========================
// JALANKAN SESUAI HALAMAN
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('formLogin')) initLogin();
  if (document.getElementById('dashboardPage')) initDashboard();
});
