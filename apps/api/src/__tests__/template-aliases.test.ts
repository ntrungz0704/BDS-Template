import { PORTAL_TEMPLATE_ALIASES, resolveTemplateAlias } from '../utils/template-aliases';

describe('template alias resolution', () => {
  it('covers the complete 24-template marketplace catalog', () => {
    expect(Object.keys(PORTAL_TEMPLATE_ALIASES)).toHaveLength(24);
    for (let index = 1; index <= 24; index += 1) {
      expect(PORTAL_TEMPLATE_ALIASES[`portal-${String(index).padStart(2, '0')}`]).toBeTruthy();
    }
  });

  it('resolves portal, bds, template-prefixed, and legacy identifiers', () => {
    expect(resolveTemplateAlias('portal-01')).toBe('luxury-gold');
    expect(resolveTemplateAlias('bds-24')).toBe('realtybuild-tech');
    expect(resolveTemplateAlias('template-portal-17')).toBe('portal-listing');
    expect(resolveTemplateAlias('minimal-white')).toBe('minimal-white');
  });
});
