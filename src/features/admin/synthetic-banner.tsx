import { t } from '@/lib/i18n'

// Every screen that shows made-up people carries this label (masking checks rely on it).
export function SyntheticBanner() {
  return (
    <div
      role='note'
      className='rounded-md border border-amber-500 bg-amber-50 px-3 py-2 text-sm text-amber-900'
    >
      <strong>{t('synthetic.label')}</strong> {t('synthetic.note')}
    </div>
  )
}
