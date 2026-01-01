// Claims: normal list, roles admin.
export default {
  "slug": "claims",
  "title": "Claims",
  "singular": "claim",
  "amountLabel": "Claimed (USD)",
  "access": [
    "admin"
  ],
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Claim name",
      "kind": "text",
      "required": true,
      "minlength": 2,
      "maxlength": 67,
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
      "maxlength": 237,
      "help": "Optional. Anything the next person should know."
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
