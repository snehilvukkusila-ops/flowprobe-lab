// Contracts: normal list, open to everyone.
export default {
  "slug": "contracts",
  "title": "Contracts",
  "singular": "contract",
  "amountLabel": "Value (USD)",
  "access": "public",
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Contract name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 41,
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
      "min": 4,
      "max": 507,
      "step": 1,
      "help": "A whole number."
    },
    {
      "name": "notes",
      "label": "Notes",
      "kind": "textarea",
      "required": false,
      "maxlength": 227,
      "help": "Optional. Anything the next person should know."
    }
  ]
}
