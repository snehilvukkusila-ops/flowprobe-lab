import { createFileRoute } from '@tanstack/react-router'
import { Access } from '@/features/admin/access'

export const Route = createFileRoute('/_authenticated/admin/access')({
  component: Access,
})
