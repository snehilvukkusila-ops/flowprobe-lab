// Reports: error list, open to everyone.
export default {
  "slug": "reports",
  "title": "Reports",
  "singular": "report",
  "amountLabel": "Pages",
  "access": "public",
  "behavior": "error",
  "fields": [
    {
      "name": "name",
      "label": "Report name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 58,
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
      "name": "confirm",
      "label": "I checked the details",
      "kind": "checkbox",
      "required": true,
      "help": "Tick to confirm before saving."
    }
  ]
}
