export interface DemoCapturedLead {
  fullName: string;
  phone: string;
  email?: string;
  selectedTemplate: string;
  packageInterest?: string;
  message: string;
}

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function labelOf(control: FormControl): string {
  const explicit = control.id
    ? control.ownerDocument.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent
    : '';
  return [
    control.name,
    control.id,
    control.getAttribute('aria-label'),
    control.getAttribute('placeholder'),
    explicit,
    control.closest('label')?.textContent,
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('vi-VN');
}

function canonicalTemplateSlug(slug: string): string {
  return slug.replace(/^portal-(\d{2})$/, 'bds-$1');
}

export function captureDemoLead(form: HTMLFormElement, templateSlug: string): DemoCapturedLead | null {
  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')
  )
    .filter((control) => !control.disabled && control.type !== 'hidden' && control.type !== 'submit')
    .map((control) => ({ control, label: labelOf(control), value: control.value.trim() }))
    .filter(({ value }) => value.length > 0);

  const phoneField = fields.find(({ control, label }) =>
    control instanceof HTMLInputElement && (control.type === 'tel' || /phone|mobile|zalo|số điện thoại|điện thoại|sđt/.test(label))
  );
  if (!phoneField) return null;

  const digits = phoneField.value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return null;
  const phone = phoneField.value.trim().startsWith('+') ? `+${digits}` : digits;

  const emailField = fields.find(({ control, label }) =>
    control instanceof HTMLInputElement && (control.type === 'email' || /email|e-mail/.test(label))
  );
  const nameField = fields.find(({ control, label }) =>
    control !== phoneField.control &&
    control !== emailField?.control &&
    /full.?name|họ.?và.?tên|họ.?tên|tên.?khách|your.?name|name/.test(label)
  );
  const details = fields
    .filter(({ control }) => control !== phoneField.control && control !== emailField?.control && control !== nameField?.control)
    .map(({ label, value }) => `${label.replace(/\s+/g, ' ').trim().slice(0, 80) || 'Nhu cầu'}: ${value}`)
    .slice(0, 8);

  const selectedTemplate = canonicalTemplateSlug(templateSlug);
  return {
    fullName: nameField?.value || `Khách xem demo ${selectedTemplate.toUpperCase()}`,
    phone,
    email: emailField?.value || '',
    selectedTemplate,
    packageInterest: 'Tư vấn template',
    message: details.join(' | ') || `Yêu cầu tư vấn từ demo ${selectedTemplate.toUpperCase()}`,
  };
}
