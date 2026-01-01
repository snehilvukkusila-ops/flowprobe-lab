import { t, type Key } from '@/lib/i18n'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const AREAS: { label: Key; viewer: boolean; editor: boolean; admin: boolean }[] =
  [
    { label: 'access.areaDashboard', viewer: true, editor: true, admin: true },
    { label: 'access.areaUsers', viewer: true, editor: true, admin: true },
    { label: 'access.areaSettings', viewer: true, editor: true, admin: true },
    { label: 'access.areaAdmin', viewer: false, editor: false, admin: true },
  ]

const yn = (v: boolean) => (v ? t('access.yes') : t('access.no'))

export function Access() {
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
            {t('access.title')}
          </h2>
          <p className='text-muted-foreground'>{t('access.desc')}</p>
        </div>
        <table className='w-full max-w-3xl text-sm'>
          <thead>
            <tr className='border-b'>
              <th scope='col' className='py-2 text-start'>
                {t('access.area')}
              </th>
              <th scope='col' className='py-2 text-start'>
                {t('access.viewer')}
              </th>
              <th scope='col' className='py-2 text-start'>
                {t('access.editor')}
              </th>
              <th scope='col' className='py-2 text-start'>
                {t('access.admin')}
              </th>
            </tr>
          </thead>
          <tbody>
            {AREAS.map((a) => (
              <tr key={a.label} className='border-b'>
                <th scope='row' className='py-2 text-start font-normal'>
                  {t(a.label)}
                </th>
                <td className='py-2'>{yn(a.viewer)}</td>
                <td className='py-2'>{yn(a.editor)}</td>
                <td className='py-2'>{yn(a.admin)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    </>
  )
}
