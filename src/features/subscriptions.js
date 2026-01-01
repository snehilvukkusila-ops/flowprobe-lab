// Subscriptions: normal list, open to everyone.
export default {
  "slug": "subscriptions",
  "title": "Subscriptions",
  "singular": "subscription",
  "amountLabel": "Monthly fee (USD)",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Subscription name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 77,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 390,
      "help": "Optional. Anything the next person should know."
    },
    {
      "name": "due",
      "label": "Due date",
      "kind": "date",
      "required": true,
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
