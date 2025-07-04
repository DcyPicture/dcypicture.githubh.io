function perbaruiNomor(event) {
  event.preventDefault();
  const input = document.getElementById('nomorBaru');
  const nomor = input.value.trim();
  const notif = document.getElementById('berhasilTersimpan');

  // Validasi nomor Indonesia (awal 08 dan panjang 10–13)
  const regex = /^08[0-9]{8,11}$/;
  if (!regex.test(nomor)) {
    alert('Nomor telepon tidak valid. Pastikan menggunakan format Indonesia, contoh: 08123456789');
    return;
  }

  // Kirim ke backend
  fetch('/api/perbarui-nomor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomor })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      notif.classList.remove('hidden');
      setTimeout(() => notif.classList.add('hidden'), 3000);
    } else {
      alert('Gagal menyimpan nomor. Coba lagi.');
    }
  });
}
