// JavaScript logic for BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  alert('🎉 Cảm ơn quý khách ' + name + ' (' + phone + ')! Chuyên viên tư vấn sẽ liên hệ lại trong ít phút.');
  this.reset();
});
