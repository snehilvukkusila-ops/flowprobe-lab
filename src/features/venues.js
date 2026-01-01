// Venues: empty list, open to everyone.
export default {
  "slug": "venues",
  "title": "Venues",
  "singular": "venue",
  "amountLabel": "Capacity (people)",
  "access": "public",
  "behavior": "empty",
  "fields": [
    {
      "name": "name",
      "label": "Venue name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 63,
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
      "min": 3,
      "max": 889,
      "step": 1,
      "help": "A whole number."
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
    }
  ]
}
