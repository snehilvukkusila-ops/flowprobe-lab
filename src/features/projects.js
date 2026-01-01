// Projects: empty list, open to everyone.
export default {
  "slug": "projects",
  "title": "Projects",
  "singular": "project",
  "amountLabel": "Budget (USD)",
  "access": "public",
  "behavior": "empty",
  "fields": [
    {
      "name": "name",
      "label": "Project name",
      "kind": "text",
      "required": true,
      "minlength": 3,
      "maxlength": 40,
      "pattern": "[A-Za-z0-9 \\-]+",
      "patternMessage": "Use letters, numbers, spaces and hyphens only.",
      "help": "A short name people will recognise. Letters, numbers, spaces and hyphens."
    },
    {
      "name": "quantity",
      "label": "Quantity",
      "kind": "number",
      "required": true,
      "min": 1,
      "max": 406,
      "step": 1,
      "help": "A whole number."
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
