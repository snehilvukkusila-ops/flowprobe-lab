import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  ScrollText,
  KeyRound,
} from 'lucide-react'
import { t } from '@/lib/i18n'
import { type NavGroup, type SidebarData } from '../types'

// FlowProbe: the third-party sign-in entries and the demo user/teams are gone (the user and workspaces come from
// the session). Titles go through t() so admin-de shows German labels.
const adminGroup: NavGroup = {
  title: t('nav.admin'),
  items: [
    {
      title: t('nav.auditLog'),
      url: '/admin/audit-log',
      icon: ScrollText,
    },
    {
      title: t('nav.access'),
      url: '/admin/access',
      icon: KeyRound,
    },
  ],
}

const baseGroups: NavGroup[] = [
  {
    title: t('nav.general'),
    items: [
      {
        title: t('nav.dashboard'),
        url: '/',
        icon: LayoutDashboard,
      },
      {
        title: t('nav.tasks'),
        url: '/tasks',
        icon: ListTodo,
      },
      {
        title: t('nav.apps'),
        url: '/apps',
        icon: Package,
      },
      {
        title: t('nav.chats'),
        url: '/chats',
        badge: '3',
        icon: MessagesSquare,
      },
      {
        title: t('nav.users'),
        url: '/users',
        icon: Users,
      },
    ],
  },
  {
    title: t('nav.pages'),
    items: [
      {
        title: t('nav.auth'),
        icon: ShieldCheck,
        items: [
          {
            title: t('nav.signIn'),
            url: '/sign-in',
          },
          {
            title: t('nav.signIn2'),
            url: '/sign-in-2',
          },
          {
            title: t('nav.signUp'),
            url: '/sign-up',
          },
          {
            title: t('nav.forgotPassword'),
            url: '/forgot-password',
          },
          {
            title: t('nav.otp'),
            url: '/otp',
          },
        ],
      },
      {
        title: t('nav.errors'),
        icon: Bug,
        items: [
          {
            title: t('nav.unauthorized'),
            url: '/errors/unauthorized',
            icon: Lock,
          },
          {
            title: t('nav.forbidden'),
            url: '/errors/forbidden',
            icon: UserX,
          },
          {
            title: t('nav.notFound'),
            url: '/errors/not-found',
            icon: FileX,
          },
          {
            title: t('nav.internalServerError'),
            url: '/errors/internal-server-error',
            icon: ServerOff,
          },
          {
            title: t('nav.maintenance'),
            url: '/errors/maintenance-error',
            icon: Construction,
          },
        ],
      },
    ],
  },
  {
    title: t('nav.other'),
    items: [
      {
        title: t('nav.settings'),
        icon: Settings,
        items: [
          {
            title: t('nav.profile'),
            url: '/settings',
            icon: UserCog,
          },
          {
            title: t('nav.account'),
            url: '/settings/account',
            icon: Wrench,
          },
          {
            title: t('nav.appearance'),
            url: '/settings/appearance',
            icon: Palette,
          },
          {
            title: t('nav.notifications'),
            url: '/settings/notifications',
            icon: Bell,
          },
          {
            title: t('nav.display'),
            url: '/settings/display',
            icon: Monitor,
          },
        ],
      },
      {
        title: t('nav.helpCenter'),
        url: '/help-center',
        icon: HelpCircle,
      },
    ],
  },
]

// The admin group is only offered to the admin role.
export function navGroupsFor(role: string | undefined): NavGroup[] {
  return role === 'admin'
    ? [baseGroups[0], adminGroup, ...baseGroups.slice(1)]
    : baseGroups
}

export const sidebarData: SidebarData = {
  navGroups: navGroupsFor('admin'),
}
