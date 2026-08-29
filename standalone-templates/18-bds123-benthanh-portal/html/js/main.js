// JavaScript logic for BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  alert('🎉 Cảm ơn quý khách ' + name + ' (' + phone + ')! Chuyên viên tư vấn sẽ liên hệ lại trong ít phút.');
  this.reset();
});
