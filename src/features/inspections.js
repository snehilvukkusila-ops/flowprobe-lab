// Inspections: normal list, open to everyone.
export default {
  "slug": "inspections",
  "title": "Inspections",
  "singular": "inspection",
  "amountLabel": "Findings",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Inspection name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 66,
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
      "name": "reference",
      "label": "Reference code",
      "kind": "text",
      "required": true,
      "minlength": 6,
      "maxlength": 6,
      "pattern": "[A-Z]{3}-[0-9]{2}",
      "patternMessage": "Use three capital letters, a hyphen and two digits, like ABC-12.",
      "help": "Format ABC-12."
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
