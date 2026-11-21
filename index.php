<?php
session_start();
include 'koneksi.php';

// Jika sudah login, langsung lempar ke dashboard
if (isset($_SESSION['nama'])) {
    header("Location: dashboard.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama = trim($_POST['nama']);
    $kelas = trim($_POST['kelas']);

    if (!empty($nama) && !empty($kelas)) {
        $_SESSION['nama'] = htmlspecialchars($nama);
        $_SESSION['kelas'] = htmlspecialchars($kelas);
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Nama dan kelas wajib diisi!";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Login - CodeNet TKJ</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 300px; }
        input, select { width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { width: 100%; background: #007bff; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .error { color: red; font-size: 13px; text-align: center; margin-bottom: 10px; }
    </style>
</head>
<body>

<div class="card">
    <h2>Masuk CodeNet TKJ</h2>
    <?php if (isset($error)) { echo "<div class='error'>$error</div>"; } ?>
    <form method="POST" action="">
        <label>Nama Lengkap:</label>
        <input type="text" name="nama" placeholder="Contoh: Budi Santoso" required>

        <label>Kelas:</label>
        <select name="kelas" required>
            <option value="">-- Pilih Kelas --</option>
            <option value="XI TKJ 1">XI TKJ 1</option>
            <option value="XI TKJ 2">XI TKJ 2</option>
            <option value="XII TKJ 1">XII TKJ 1</option>
            <option value="XII TKJ 2">XII TKJ 2</option>
        </select>

        <button type="submit">Masuk</button>
    </form>
</div>

</body>

</html>
