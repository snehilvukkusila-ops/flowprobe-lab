// Shifts: normal list, open to everyone.
export default {
  "slug": "shifts",
  "title": "Shifts",
  "singular": "shift",
  "amountLabel": "Hours",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Shift name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 76,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "quantity",
      "label": "Quantity",
      "kind": "number",
      "required": true,
      "min": 2,
      "max": 650,
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
