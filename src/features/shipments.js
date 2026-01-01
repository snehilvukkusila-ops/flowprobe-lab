// Shipments: normal list, open to everyone.
export default {
  "slug": "shipments",
  "title": "Shipments",
  "singular": "shipment",
  "amountLabel": "Weight (kg)",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Shipment name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 77,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "quantity",
      "label": "Quantity",
      "kind": "number",
      "required": true,
      "min": 3,
      "max": 286,
      "step": 1,
      "help": "A whole number."
    },
    {
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 231,
      "help": "Optional. Anything the next person should know."
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
