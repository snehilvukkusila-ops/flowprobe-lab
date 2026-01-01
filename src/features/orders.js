// Orders: normal list, open to everyone.
export default {
  "slug": "orders",
  "title": "Orders",
  "singular": "order",
  "amountLabel": "Total (USD)",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Order name",
      "kind": "text",
      "required": true,
      "minlength": 2,
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
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 291,
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
