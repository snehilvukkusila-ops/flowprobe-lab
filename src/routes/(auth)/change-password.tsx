import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { ChangePassword } from '@/features/auth/change-password'

export const Route = createFileRoute('/(auth)/change-password')({
  component: ChangePassword,
  validateSearch: z.object({ redirect: z.string().optional() }),
})
