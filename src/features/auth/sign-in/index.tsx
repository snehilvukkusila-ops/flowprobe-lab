import { Link, useSearch } from '@tanstack/react-router'
import { t } from '@/lib/i18n'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { redirect, reason } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>
      <Card className='max-w-sm gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('signin.title')}
          </CardTitle>
          <CardDescription>
            {t('signin.desc')} {t('signin.noAccount')}{' '}
            <Link
              to='/sign-up'
              className='text-nowrap underline underline-offset-4 hover:text-primary'
            >
              {t('signin.signUp')}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm redirectTo={redirect} expired={reason === 'expired'} />
        </CardContent>
        <CardFooter>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            FlowProbe test app. All accounts and data are synthetic.
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
