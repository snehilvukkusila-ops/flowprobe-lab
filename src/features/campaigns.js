// Campaigns: error list, open to everyone.
export default {
  "slug": "campaigns",
  "title": "Campaigns",
  "singular": "campaign",
  "amountLabel": "Budget (USD)",
  "access": "public",
  "behavior": "error",
  "fields": [
    {
      "name": "name",
      "label": "Campaign name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 42,
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
