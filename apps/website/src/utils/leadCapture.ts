export interface CapturedLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  formId: string;
  sourcePage: string;
  sourceUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function controlLabel(control: FormControl): string {
  const explicitLabel = control.id
    ? control.ownerDocument.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent
    : '';

  return [
    control.name,
    control.id,
    control.getAttribute('aria-label'),
    control.getAttribute('placeholder'),
    explicitLabel,
    control.closest('label')?.textContent,
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('vi-VN');
}

function normalizePhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.startsWith('+') ? `+${digits}` : digits;
}

/**
 * Converts any template lead form into the canonical tenant CRM payload.
 * Calculator/search/newsletter forms without a valid phone field are ignored.
 */
export function captureLeadFromForm(
  form: HTMLFormElement,
  templateSlug: string,
  pageSlug: string
): CapturedLeadPayload | null {
  const controls = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')
  ).filter((control) => !control.disabled && control.type !== 'hidden' && control.type !== 'submit');

  const values = controls
    .map((control) => ({ control, label: controlLabel(control), value: control.value.trim() }))
    .filter(({ value }) => value.length > 0);

  const phoneField = values.find(({ control, label }) =>
    control instanceof HTMLInputElement && (control.type === 'tel' || /phone|mobile|zalo|số điện thoại|điện thoại|sđt/.test(label))
  );
  if (!phoneField) return null;

  const phone = normalizePhone(phoneField.value);
  if (phone.replace(/\D/g, '').length < 9) return null;

  const emailField = values.find(({ control, label }) =>
    control instanceof HTMLInputElement && (control.type === 'email' || /email|e-mail/.test(label))
  );
  const nameField = values.find(({ control, label }) =>
    control !== phoneField.control &&
    control !== emailField?.control &&
    /full.?name|họ.?và.?tên|họ.?tên|tên.?khách|your.?name|name/.test(label)
  );

  const details = values
    .filter(({ control }) => control !== phoneField.control && control !== emailField?.control && control !== nameField?.control)
    .map(({ label, value }) => `${label.replace(/\s+/g, ' ').trim().slice(0, 80) || 'Nhu cầu'}: ${value}`)
    .slice(0, 8);

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const sourcePage = pageSlug || 'home';
  const formIndex = Array.from(form.ownerDocument.forms).indexOf(form) + 1;

  return {
    fullName: nameField?.value || `Khách hàng quan tâm ${templateSlug.toUpperCase()}`,
    email: emailField?.value || '',
    phone,
    message: details.join(' | ') || `Yêu cầu tư vấn từ ${templateSlug.toUpperCase()} - trang ${sourcePage}`,
    source: `template_${templateSlug}`,
    formId: `${templateSlug}-${sourcePage}-form-${Math.max(1, formIndex)}`.slice(0, 100),
    sourcePage,
    sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
}
