import { faker } from '@faker-js/faker'

// FlowProbe: every row here is SYNTHETIC PERSONAL DATA. Names come from faker (seed 67890);
// emails are @probe.test and phone numbers sit in the reserved 555-01xx range. The first
// three rows carry the exact marker values PII-SENTINEL-1..3 so masking checks can look for them.
// Dates are relative to a fixed reference date, never to the wall clock.
faker.setDefaultRefDate('2026-01-01T00:00:00.000Z')
faker.seed(67890)

const SENTINELS = ['PII-SENTINEL-1', 'PII-SENTINEL-2', 'PII-SENTINEL-3']

export const users = Array.from({ length: 500 }, (_, i) => {
  const firstName = faker.person.firstName()
  const lastName = SENTINELS[i] ?? faker.person.lastName()
  const username = faker.internet
    .username({ firstName, lastName })
    .toLocaleLowerCase()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username,
    email: `${username.replace(/[^a-z0-9._-]/g, '')}@probe.test`,
    phoneNumber: `+1 555-01${String(i % 100).padStart(2, '0')}`,
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
