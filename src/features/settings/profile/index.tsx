import { t } from '@/lib/i18n'
import { useAuthStore } from '@/stores/auth-store'
import { SyntheticBanner } from '@/features/admin/synthetic-banner'
import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  const user = useAuthStore((s) => s.auth.user)
  return (
    <ContentSection
      title={t('nav.profile')}
      desc='This is how others will see you on the site.'
    >
      <>
        <SyntheticBanner />
        {user && (
          <dl className='my-6 grid max-w-md grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm'>
            <dt className='text-muted-foreground'>{t('signin.email')}</dt>
            <dd>{user.email}</dd>
            <dt className='text-muted-foreground'>{t('you.role')}</dt>
            <dd>{user.role}</dd>
            <dt className='text-muted-foreground'>{t('you.employeeId')}</dt>
            <dd>{user.employeeId}</dd>
            <dt className='text-muted-foreground'>Tel.</dt>
            <dd>{user.phone}</dd>
          </dl>
        )}
        <ProfileForm />
      </>
    </ContentSection>
  )
}
