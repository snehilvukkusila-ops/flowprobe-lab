import { useQuery } from '@tanstack/react-query'
import { t } from '@/lib/i18n'
import { api } from '@/lib/probe-api'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SyntheticBanner } from './synthetic-banner'

type AuditEvent = { id: string; at: string; actor: string; action: string }

export function AuditLog() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['audit-log'],
    queryFn: () => api<{ events: AuditEvent[] }>('/api/admin/audit-log'),
  })
  const events = Array.isArray(data?.events) ? data.events : []

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('admin.auditTitle')}
          </h2>
          <p className='text-muted-foreground'>{t('admin.auditDesc')}</p>
        </div>
        <SyntheticBanner />
        {isPending && <p role='status'>{t('admin.loading')}</p>}
        {isError && <p role='alert'>{t('admin.loadFailed')}</p>}
        {events.length > 0 && (
          <table className='w-full max-w-3xl text-sm'>
            <thead>
              <tr className='border-b text-start'>
                <th scope='col' className='py-2 text-start'>
                  {t('admin.when')}
                </th>
                <th scope='col' className='py-2 text-start'>
                  {t('admin.who')}
                </th>
                <th scope='col' className='py-2 text-start'>
                  {t('admin.what')}
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id} className='border-b'>
                  <td className='py-2'>{ev.at}</td>
                  <td className='py-2'>{ev.actor}</td>
                  <td className='py-2'>{ev.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Main>
    </>
  )
}
