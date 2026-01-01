// Field rules shared by every form. Pure: no DOM, so the selftests import it directly.
export function validateField(field, raw) {
  const value = field.kind === 'checkbox' ? !!raw : String(raw ?? '').trim()
  if (field.kind === 'checkbox') {
    return field.required && !value ? `Tick "${field.label}" to continue.` : ''
  }
  if (value === '') return field.required ? `${field.label} is required.` : ''
  if (field.minlength && value.length < field.minlength) return `${field.label} needs at least ${field.minlength} characters.`
  if (field.maxlength && value.length > field.maxlength) return `${field.label} can be at most ${field.maxlength} characters.`
  if (field.pattern && !new RegExp(`^(?:${field.pattern})$`).test(value)) return field.patternMessage || `${field.label} is not in the expected format.`
  if (field.kind === 'number') {
    const n = Number(value)
    if (!Number.isFinite(n)) return `${field.label} must be a number.`
    if (field.min !== undefined && n < field.min) return `${field.label} must be at least ${field.min}.`
    if (field.max !== undefined && n > field.max) return `${field.label} must be at most ${field.max}.`
  }
  if (field.kind === 'date' && field.min && value < field.min) return `${field.label} cannot be before ${field.min}.`
  if (field.kind === 'select' && !field.options.some((o) => o.value === value)) return `Choose one of the ${field.label.toLowerCase()} options.`
  return ''
}

export function validateAll(fields, values) {
  const errors = {}
  for (const f of fields) {
    const msg = validateField(f, values[f.name])
    if (msg) errors[f.name] = msg
  }
  return errors
}
