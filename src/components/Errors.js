export default ({ error }) => {
  if (!error) return null

  return (
    <div className="errors">
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i} style={{ color: 'red' }}>
          {message}
        </span>
      ))}
    </div>
  )
}