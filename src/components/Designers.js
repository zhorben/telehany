import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DESIGNERS } from '../graphql/designer'

export default () => {
  const { loading, data: { designers } } = useQuery(DESIGNERS)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="designers">
      <h3>Designers</h3>

      {designers.map(({ title }, index) =>
        <div key={index}>
          {title}
        </div>
      )}

    <style jsx>{`
      .designers {
        margin: 40px 0;
      }
    `}</style>
    </div>
  )
}