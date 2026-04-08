<?php
require_once __DIR__ . '/../db/db.php';

$stmt = $dbh->query("SELECT id, nev, tipus, dijazott FROM suti ORDER BY id ASC");
$sutik = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Sütemények</h1>

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Típus</th>
            <th>Díjazott</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($sutik as $suti): ?>
            <tr>
                <td><?= htmlspecialchars($suti['id']) ?></td>
                <td><?= htmlspecialchars($suti['nev']) ?></td>
                <td><?= htmlspecialchars($suti['tipus']) ?></td>
                <td><?= $suti['dijazott'] ? 'Igen' : 'Nem' ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>