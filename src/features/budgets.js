// Budgets: normal list, roles member, manager, admin.
export default {
  "slug": "budgets",
  "title": "Budgets",
  "singular": "budget",
  "amountLabel": "Limit (USD)",
  "access": [
    "member",
    "manager",
    "admin"
  ],
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Budget name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 56,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "contact",
      "label": "Contact e-mail",
      "kind": "email",
      "required": false,
      "maxlength": 80,
      "pattern": "[A-Za-z0-9._-]+@probe\\.test",
      "patternMessage": "Use an address ending in @probe.test.",
      "help": "Invented addresses end in @probe.test."
    },
    {
      "name": "quantity",
      "label": "Quantity",
      "kind": "number",
      "required": true,
      "min": 4,
      "max": 422,
      "step": 1,
      "help": "A whole number."
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
