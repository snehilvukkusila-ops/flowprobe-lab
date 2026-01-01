// Warehouses: normal list, roles manager, admin.
export default {
  "slug": "warehouses",
  "title": "Warehouses",
  "singular": "warehouse",
  "amountLabel": "Capacity (pallets)",
  "access": [
    "manager",
    "admin"
  ],
  "behavior": "normal",
  "fields": [
    {
      "name": "name",
      "label": "Warehouse name",
      "kind": "text",
      "required": true,
      "minlength": 4,
      "maxlength": 45,
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
