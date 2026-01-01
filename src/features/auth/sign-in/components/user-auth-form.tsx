import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { t } from '@/lib/i18n'
import { api, ApiError, type SessionUser } from '@/lib/probe-api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? t('signin.enterEmail') : undefined),
  }),
  password: z.string().min(1, t('signin.enterPassword')),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
  expired?: boolean
}

export function UserAuthForm({
  className,
  redirectTo,
  expired,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await api<{
        user: SessionUser
        mustChangePassword: boolean
      }>('/api/auth/login', { method: 'POST', body: data })
      const search = redirectTo ? { redirect: redirectTo } : {}
      if (res.mustChangePassword) {
        navigate({ to: '/change-password', search, replace: true })
      } else if (res.user.workspaces.length > 1 && !res.user.workspace) {
        navigate({ to: '/select-workspace', search, replace: true })
      } else {
        navigate({ to: redirectTo || '/', replace: true })
      }
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('signin.failed'))
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        {expired && !error && (
          <p role='status' className='text-sm font-medium text-amber-700'>
            {t('signin.expired')}
          </p>
        )}
        {error && (
          <p role='alert' className='text-sm font-medium text-destructive'>
            {error}
          </p>
        )}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('signin.email')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='username'
                  placeholder='name@probe.test'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>{t('signin.password')}</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete='current-password'
                  placeholder='********'
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='absolute inset-e-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                {t('signin.forgot')}
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          {isLoading ? t('signin.busy') : t('signin.submit')}
        </Button>
      </form>
    </Form>
  )
}
