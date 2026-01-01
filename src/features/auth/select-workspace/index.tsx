import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { t } from '@/lib/i18n'
import { api, ApiError, fetchMe, type Workspace } from '@/lib/probe-api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'

export function SelectWorkspace() {
  const { redirect } = useSearch({ from: '/(auth)/select-workspace' })
  const navigate = useNavigate()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMe().then((r) => {
      if (r.status === 'anonymous') {
        navigate({ to: '/sign-in', replace: true })
      } else {
        setWorkspaces(r.me.user.workspaces ?? [])
      }
    })
  }, [navigate])

  async function choose(id: string) {
    setError(null)
    try {
      await api('/api/auth/workspace', { method: 'POST', body: { id } })
      navigate({ to: redirect || '/', replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('signin.failed'))
    }
  }

  return (
    <AuthLayout>
      <Card className='max-w-sm gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('ws.title')}
          </CardTitle>
          <CardDescription>{t('ws.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p role='alert' className='mb-3 text-sm font-medium text-destructive'>
              {error}
            </p>
          )}
          <ul className='grid gap-2'>
            {workspaces.map((w) => (
              <li key={w.id}>
                <Button
                  variant='outline'
                  className='w-full justify-between'
                  onClick={() => choose(w.id)}
                >
                  <span>{w.name}</span>
                  <span className='text-muted-foreground'>{t('ws.open')}</span>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
