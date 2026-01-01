// Audits: empty list, open to everyone.
export default {
  "slug": "audits",
  "title": "Audits",
  "singular": "audit",
  "amountLabel": "Issues found",
  "access": "public",
  "behavior": "empty",
  "fields": [
    {
      "name": "name",
      "label": "Audit name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 74,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "priority",
      "label": "Priority",
      "kind": "select",
      "required": true,
      "options": [
        {
          "value": "low",
          "label": "low"
        },
        {
          "value": "normal",
          "label": "normal"
        },
        {
          "value": "high",
          "label": "high"
        }
      ],
      "help": "Pick how soon this is needed."
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
