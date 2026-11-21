<?php
session_start();
include 'koneksi.php';

// Cek session login
if (!isset($_SESSION['nama'])) {
    header("Location: index.php");
    exit();
}

// Proses jika tombol kirim komentar ditekan
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['kirim_komentar'])) {
    $komentar = trim($_POST['komentar']);
    $nama = $_SESSION['nama'];
    $kelas = $_SESSION['kelas'];

    if (!empty($komentar)) {
        $stmt = $conn->prepare("INSERT INTO comments (student_name, student_class, comment_text) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nama, $kelas, $komentar);
        $stmt->execute();
        $stmt->close();
        header("Location: dashboard.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - CodeNet TKJ</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f9; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        .logout-btn { background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 14px; }
        textarea { width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
        .comment-box { background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 4px; border-left: 3px solid #007bff; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div>
            <h3>Selamat Datang, <?php echo $_SESSION['nama']; ?></h3>
            <p style="margin: 0; color: #666; font-size: 14px;">Kelas: <?php echo $_SESSION['kelas']; ?></p>
        </div>
        <a href="logout.php" class="logout-btn">Keluar</a>
    </div>

    <!-- Bagian Modul -->
    <div style="margin-top: 20px;">
        <h2>Modul: Dasar Bash Scripting Linux</h2>
        <p>Bash scripting adalah sekumpulan perintah terminal Linux yang disatukan ke dalam satu file teks untuk melakukan otomatisasi tugas administrasi jaringan.</p>
    </div>

    <hr style="margin: 30px 0;">

    <!-- Bagian Komentar -->
    <h3>Diskusi & Pertanyaan Modul</h3>
    <form method="POST" action="">
        <textarea name="komentar" placeholder="Tulis pertanyaan atau pendapatmu tentang modul ini..." required></textarea>
        <button type="submit" name="kirim_komentar">Kirim Komentar</button>
    </form>

    <div style="margin-top: 20px;">
        <?php
        $result = mysqli_query($conn, "SELECT * FROM comments ORDER id DESC");
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<div class='comment-box'>";
            echo "<strong>" . htmlspecialchars($row['student_name']) . " (" . htmlspecialchars($row['student_class']) . ")</strong>";
            echo "<p style='margin: 5px 0 0 0;'>" . htmlspecialchars($row['comment_text']) . "</p>";
            echo "</div>";
        }
        ?>
    </div>
</div>

</body>
</html>
</html>
