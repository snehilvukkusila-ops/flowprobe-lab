// Tickets: normal list, roles manager, admin.
export default {
  "slug": "tickets",
  "title": "Tickets",
  "singular": "ticket",
  "amountLabel": "Minutes open",
  "access": [
    "manager",
    "admin"
  ],
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Ticket name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 44,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 402,
      "help": "Optional. Anything the next person should know."
    },
    {
      "name": "due",
      "label": "Due date",
      "kind": "date",
      "required": false,
      "min": "2026-01-01",
      "help": "Not before 2026-01-01."
    },
    {
      "name": "reference",
      "label": "Reference code",
      "kind": "text",
      "required": true,
      "minlength": 6,
      "maxlength": 6,
      "pattern": "[A-Z]{3}-[0-9]{2}",
      "patternMessage": "Use three capital letters, a hyphen and two digits, like ABC-12.",
      "help": "Format ABC-12."
    }
  ]
}
