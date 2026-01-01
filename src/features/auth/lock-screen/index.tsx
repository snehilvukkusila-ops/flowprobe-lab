import { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { LockKeyhole } from 'lucide-react'
import { t } from '@/lib/i18n'
import { api, ApiError } from '@/lib/probe-api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/password-input'
import { AuthLayout } from '../auth-layout'

export function LockScreen() {
  const { redirect } = useSearch({ from: '/(auth)/lock-screen' })
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await api('/api/auth/unlock', { method: 'POST', body: { password } })
      navigate({ to: redirect || '/', replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('signin.failed'))
      setBusy(false)
    }
  }

  return (
    <AuthLayout>
      <Card className='max-w-sm gap-4'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-lg tracking-tight'>
            <LockKeyhole className='size-5' aria-hidden='true' />
            {t('lock.title')}
          </CardTitle>
          <CardDescription>{t('lock.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={unlock} className='grid gap-3'>
            {error && (
              <p role='alert' className='text-sm font-medium text-destructive'>
                {error}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='lock-password'>{t('signin.password')}</Label>
              <PasswordInput
                id='lock-password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button disabled={busy || password === ''}>
              {busy ? t('lock.busy') : t('lock.unlock')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='justify-center'>
          <a
            href='/logout'
            className='text-sm underline underline-offset-4 hover:text-primary'
          >
            {t('menu.logOut')}
          </a>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
