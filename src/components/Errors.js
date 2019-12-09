export default function Error({ error }) {
  if (!error) return null

  return (
    <div>
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i} style={{ color: 'red' }}>
          {message}
        </span>
      ))}
    </div>
  )
}