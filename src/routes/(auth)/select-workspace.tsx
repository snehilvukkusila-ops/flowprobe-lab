import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { SelectWorkspace } from '@/features/auth/select-workspace'

export const Route = createFileRoute('/(auth)/select-workspace')({
  component: SelectWorkspace,
  validateSearch: z.object({ redirect: z.string().optional() }),
})
