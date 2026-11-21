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
    konten: 'Model OSI adalah kerangka berpikir yang membagi komunikasi jaringan menjadi 7 lapisan. Tujuannya supaya setiap lapisan punya tugasnya sendiri, jadi kalau ada masalah kita tahu harus mengecek di lapisan mana.\n\n7. Application: lapisan tempat aplikasi berinteraksi dengan pengguna. Contoh protokol: HTTP, FTP, SMTP, DNS.\n6. Presentation: mengurus format data, enkripsi, dan kompresi. Contoh: SSL/TLS, JPEG.\n5. Session: membuka, menjaga, dan menutup sesi komunikasi antara dua perangkat.\n4. Transport: mengatur pengiriman data dari ujung ke ujung dan nomor port. Protokolnya TCP dan UDP. Datanya disebut segment.\n3. Network: menentukan jalur pengiriman lewat alamat IP. Perangkatnya router. Datanya disebut packet.\n2. Data Link: pengiriman antar perangkat dalam satu jaringan lokal memakai alamat MAC. Perangkatnya switch. Datanya disebut frame.\n1. Physical: bit dikirim lewat kabel, sinyal, atau gelombang radio. Perangkatnya kabel, hub, dan repeater.\n\nCara mengingat dari atas ke bawah: All People Seem To Need Data Processing.\nCara mengingat dari bawah ke atas: Please Do Not Throw Sausage Pizza Away.\n\nContoh: saat kamu membuka website, data dari browser (Application) dibungkus lapis demi lapis sampai menjadi bit di kabel (Physical). Di sisi penerima, prosesnya dibalik.'
  },
  {
    id: 'jaringan-tcpip',
    judul: 'Model TCP/IP dan Perbedaan TCP vs UDP',
    kategori: 'Jaringan',
    konten: 'TCP/IP adalah model yang benar-benar dipakai di internet. Modelnya hanya 4 lapisan:\n\n1. Network Access: gabungan Physical dan Data Link di OSI.\n2. Internet: setara Network di OSI, berisi protokol IP.\n3. Transport: berisi TCP dan UDP.\n4. Application: gabungan Session, Presentation, dan Application di OSI.\n\nPerbedaan utamanya: OSI adalah model teori yang bagus untuk belajar, sedangkan TCP/IP adalah model yang dipakai dalam praktik.\n\nTCP vs UDP:\n- TCP: andal dan berbasis koneksi. Dimulai dengan three-way handshake (SYN, SYN-ACK, ACK) dan memastikan data yang hilang dikirim ulang. Dipakai untuk web (HTTP), email, dan transfer file.\n- UDP: cepat dan tanpa koneksi, tidak ada jaminan data sampai. Dipakai untuk streaming, game online, DNS, dan VoIP.\n\nAnalogi: TCP seperti kurir yang meminta tanda terima. UDP seperti melempar surat tanpa tanda terima. Cepat, tapi ada kemungkinan hilang.'
  },
  {
    id: 'jaringan-ip',
    judul: 'Pengalamatan IP dan Subnetting',
    kategori: 'Jaringan',
    konten: 'IPv4 adalah alamat logika untuk mengidentifikasi perangkat di jaringan. Panjangnya 32 bit, ditulis dalam 4 oktet (8 bit per oktet), contohnya 192.168.1.10.\n\nKelas alamat (cara lama, tapi tetap penting dipelajari):\n- Kelas A: 1 sampai 126, default mask 255.0.0.0 (/8)\n- Kelas B: 128 sampai 191, default mask 255.255.0.0 (/16)\n- Kelas C: 192 sampai 223, default mask 255.255.255.0 (/24)\n\nAlamat private (tidak bisa langsung diakses dari internet, dipakai di rumah dan kantor):\n- 10.0.0.0 sampai 10.255.255.255\n- 172.16.0.0 sampai 172.31.255.255\n- 192.168.0.0 sampai 192.168.255.255\n\nRumus jumlah host yang bisa dipakai: 2^n - 2, dengan n adalah jumlah bit host. Dikurangi 2 karena alamat pertama adalah alamat network dan alamat terakhir adalah broadcast.\n\nContoh /24: bit host ada 8, jadi 2^8 - 2 = 254 host.\nContoh /26: bit host ada 6, jadi 2^6 - 2 = 62 host. Alamat network 192.168.1.0, host dari 192.168.1.1 sampai 192.168.1.62, broadcast 192.168.1.63. Subnet berikutnya mulai dari 192.168.1.64.\n\nLatihan: alamat 192.168.1.130 dengan /25 berada di network mana? Jawabannya 192.168.1.128, karena blok /25 berukuran 128 alamat.'
  },
  {
    id: 'jaringan-perangkat',
    judul: 'Perangkat Jaringan dan Kabel',
    kategori: 'Jaringan',
    konten: 'Perangkat jaringan dan fungsinya:\n\n- Modem: mengubah sinyal dari ISP menjadi data yang bisa dipakai jaringan lokal.\n- Hub: menyambungkan banyak perangkat, tapi data dikirim ke semua port (broadcast). Boros dan lambat, sekarang jarang dipakai. Bekerja di Layer 1.\n- Switch: meneruskan data hanya ke port tujuan berdasarkan alamat MAC. Bekerja di Layer 2.\n- Router: menghubungkan beberapa jaringan dan menentukan jalur terbaik lewat alamat IP. Bekerja di Layer 3.\n- Access Point: memancarkan sinyal WiFi supaya perangkat nirkabel bisa terhubung ke jaringan kabel.\n- Firewall: menyaring lalu lintas data berdasarkan aturan keamanan.\n\nDi rumah, satu perangkat biasanya menggabungkan beberapa fungsi sekaligus. Contohnya router WiFi yang sudah punya switch dan access point di dalamnya.\n\nKabel yang sering dipakai: UTP Cat5e atau Cat6 dengan konektor RJ-45. Ada dua standar urutan kabel, T568A dan T568B. Kabel straight dipakai untuk menghubungkan PC ke switch. Kabel cross dulu dipakai untuk switch ke switch, tapi sekarang banyak perangkat sudah otomatis menyesuaikan (auto-MDIX).'
  },

  // ===================== PEMROGRAMAN =====================
  {
    id: 'prog-variabel',
    judul: 'Variabel dan Tipe Data',
    kategori: 'Pemrograman',
    konten: 'Variabel adalah tempat menyimpan nilai yang bisa diubah selama program berjalan. Bayangkan seperti kotak yang diberi label.\n\nContoh di Python:\nnama = "Budi"\numur = 17\nnilai_rata = 85.5\nsudah_lulus = True\n\nTipe data dasar:\n- int: bilangan bulat, contoh 17\n- float: bilangan desimal, contoh 85.5\n- str: teks, contoh "Budi"\n- bool: True atau False\n\nUntuk mengecek tipe data, pakai type():\nprint(type(umur))  # hasilnya int\n\nTips: beri nama variabel yang deskriptif dengan huruf kecil dan garis bawah, misalnya nilai_akhir, bukan x atau data1.'
  },
  {
    id: 'prog-kondisi',
    judul: 'Percabangan (if, elif, else)',
    kategori: 'Pemrograman',
    konten: 'Percabangan dipakai untuk memilih aksi berdasarkan kondisi. Program mengecek kondisi dari atas ke bawah dan menjalankan blok pertama yang bernilai benar.\n\nContoh:\nnilai = 72\nif nilai >= 75:\n    print("Lulus dengan baik")\nelif nilai >= 60:\n    print("Remedial")\nelse:\n    print("Tidak lulus")\n\nOperator perbandingan: == (sama dengan), != (tidak sama), >, <, >=, <=\nOperator logika: and, or, not\n\nContoh gabungan:\nif umur >= 17 and sudah_daftar:\n    print("Boleh ikut")\n\nPerhatian: indentasi (spasi di awal baris) di Python harus konsisten. Kalau salah, program akan error.'
  },
  {
    id: 'prog-perulangan',
    judul: 'Perulangan (for dan while)',
    kategori: 'Pemrograman',
    konten: 'Perulangan dipakai untuk menjalankan blok kode berkali-kali tanpa harus menulisnya ulang.\n\nFor loop, dipakai kalau jumlah pengulangan sudah diketahui:\nfor i in range(1, 6):\n    print("Pengulangan ke", i)\n\nrange(1, 6) menghasilkan angka 1, 2, 3, 4, 5. Angka akhir tidak ikut.\n\nWhile loop, dipakai selama kondisi masih benar:\nhitung = 1\nwhile hitung <= 3:\n    print("Hitungan:", hitung)\n    hitung += 1\n\nHati-hati dengan infinite loop. Kalau kondisinya tidak pernah salah, program akan terus berjalan. Pastikan ada perubahan nilai di dalam loop, seperti hitung += 1 di atas.\n\nBreak dan continue:\n- break: keluar dari loop sekarang juga\n- continue: lewati sisa blok dan lanjut ke pengulangan berikutnya'
  },
  {
    id: 'prog-fungsi',
    judul: 'Fungsi',
    kategori: 'Pemrograman',
    konten: 'Fungsi adalah blok kode yang diberi nama supaya bisa dipanggil berulang kali. Fungsi membuat kode lebih rapi dan lebih mudah diperbaiki.\n\nContoh:\ndef tambah(a, b):\n    return a + b\n\nhasil = tambah(5, 3)\nprint(hasil)  # hasilnya 8\n\nParameter adalah variabel di dalam tanda kurung saat fungsi dibuat (a dan b di atas). Argumen adalah nilai yang kita kirim saat memanggil fungsi (5 dan 3).\n\nFungsi tanpa return hanya menjalankan perintah dan tidak mengembalikan nilai.\n\nContoh fungsi pengecek bilangan genap:\ndef cek_genap(n):\n    if n % 2 == 0:\n        return True\n    return False\n\nTanda % adalah operator modulo, yaitu sisa bagi. Contohnya 7 % 2 hasilnya 1.'
  },

  // ===================== SISTEM OPERASI =====================
  {
    id: 'so-linux-dasar',
    judul: 'Perintah Dasar Linux',
    kategori: 'Sistem Operasi',
    konten: 'Linux banyak dipakai di server dan perangkat jaringan, jadi penting banget dikuasai. Berikut perintah dasar di terminal.\n\nNavigasi dan file:\n- pwd: menampilkan lokasi folder sekarang\n- ls: melihat isi folder (ls -la untuk detail termasuk file tersembunyi)\n- cd nama_folder: pindah folder (cd .. untuk naik satu level)\n- mkdir nama_folder: membuat folder\n- touch file.txt: membuat file kosong\n- cp asal tujuan: menyalin file\n- mv asal tujuan: memindahkan atau mengganti nama file\n- rm file.txt: menghapus file (hati-hati, di terminal tidak ada tempat sampah)\n- cat file.txt: menampilkan isi file\n\nJaringan:\n- ip a: melihat alamat IP semua interface\n- ping -c 4 8.8.8.8: mengecek koneksi ke server lain sebanyak 4 kali\n- sudo apt update: memperbarui daftar paket\n\nHak akses:\n- chmod 755 script.sh: mengatur izin file\n- sudo: menjalankan perintah sebagai administrator\n\nTips: tekan tombol Tab untuk melengkapi nama file secara otomatis, dan tombol panah atas untuk melihat perintah sebelumnya.'
  },

  // ===================== KEAMANAN =====================
  {
    id: 'keamanan-dasar',
    judul: 'Dasar Keamanan Jaringan',
    kategori: 'Keamanan',
    konten: 'Keamanan jaringan menjaga tiga hal utama yang disebut CIA:\n- Confidentiality (kerahasiaan): data hanya bisa diakses pihak yang berhak. Contohnya enkripsi.\n- Integrity (integritas): data tidak diubah tanpa izin. Contohnya checksum dan tanda tangan digital.\n- Availability (ketersediaan): layanan tetap bisa diakses. Contohnya server cadangan dan perlindungan dari serangan DDoS.\n\nBeberapa perlindungan dasar:\n- Firewall: menyaring lalu lintas masuk dan keluar.\n- WPA2 atau WPA3: pengamanan WiFi. Hindari WEP karena sudah mudah ditembus.\n- Password kuat: panjang, campuran huruf, angka, dan simbol. Jangan dipakai ulang di banyak tempat.\n- VPN: membuat terowongan terenkripsi saat terhubung ke jaringan publik.\n- Update rutin: menutup celah keamanan yang sudah diketahui.\n\nJenis serangan yang perlu dikenali:\n- Phishing: penipuan lewat email atau pesan palsu untuk mencuri data login.\n- Brute force: mencoba banyak kombinasi password sampai ketemu.\n- Sniffing: menyadap data yang lewat di jaringan yang tidak terenkripsi.\n\nCatatan penting: mempelajari keamanan itu boleh dan memang penting, tapi mencoba menyerang jaringan orang lain tanpa izin melanggar hukum (UU ITE). Latihan sebaiknya dilakukan di lab sendiri.'
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
