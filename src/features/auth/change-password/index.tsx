import { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import { t } from '@/lib/i18n'
import { api, ApiError } from '@/lib/probe-api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/password-input'
import { AuthLayout } from '../auth-layout'

export function ChangePassword() {
  const { redirect } = useSearch({ from: '/(auth)/change-password' })
  const navigate = useNavigate()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [again, setAgain] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (next !== again) {
      setError(t('pw.mismatch'))
      return
    }
    setBusy(true)
    try {
      await api('/api/auth/change-password', {
        method: 'POST',
        body: { current, next },
      })
      toast.success(t('pw.saved'))
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
          <CardTitle className='text-lg tracking-tight'>
            {t('pw.title')}
          </CardTitle>
          <CardDescription>{t('pw.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={save} className='grid gap-3'>
            {error && (
              <p role='alert' className='text-sm font-medium text-destructive'>
                {error}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='pw-current'>{t('pw.current')}</Label>
              <PasswordInput
                id='pw-current'
                autoComplete='current-password'
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='pw-next'>{t('pw.next')}</Label>
              <PasswordInput
                id='pw-next'
                autoComplete='new-password'
                value={next}
                onChange={(e) => setNext(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='pw-again'>{t('pw.confirm')}</Label>
              <PasswordInput
                id='pw-again'
                autoComplete='new-password'
                value={again}
                onChange={(e) => setAgain(e.target.value)}
              />
            </div>
            <Button disabled={busy || !current || !next || !again}>
              {busy ? t('pw.busy') : t('pw.save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
