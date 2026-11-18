interface FieldMessageProps {
  error?: string
  hint?: string
}

function FieldMessage({ error, hint }: FieldMessageProps) {
  if (error) {
    return (
      <p role="alert" className="text-xs text-red-600">
        {error}
      </p>
    )
  }
  if (hint) return <p className="text-xs text-neutral-500">{hint}</p>
  return null
}

export default FieldMessage
