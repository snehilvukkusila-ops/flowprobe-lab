import { createFileRoute } from '@tanstack/react-router'
import { AuditLog } from '@/features/admin/audit-log'

export const Route = createFileRoute('/_authenticated/admin/audit-log')({
  component: AuditLog,
})
