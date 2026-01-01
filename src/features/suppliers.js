// Suppliers: normal list, roles admin.
export default {
  "slug": "suppliers",
  "title": "Suppliers",
  "singular": "supplier",
  "amountLabel": "Open orders",
  "access": [
    "admin"
  ],
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Supplier name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 47,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "contact",
      "label": "Contact e-mail",
      "kind": "email",
      "required": true,
      "maxlength": 80,
      "pattern": "[A-Za-z0-9._-]+@probe\\.test",
      "patternMessage": "Use an address ending in @probe.test.",
      "help": "Invented addresses end in @probe.test."
    },
    {
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 469,
      "help": "Optional. Anything the next person should know."
    },
    {
      "name": "due",
      "label": "Due date",
      "kind": "date",
      "required": true,
      "min": "2026-01-01",
      "help": "Not before 2026-01-01."
    }
  ]
}
