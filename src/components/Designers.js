import React from 'react'
import Link from 'next/link'
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

      {designers.map(({ id, title }, index) =>
        <Link key={index} href={`/brand?id=${id}`} as={`/brand/${id}`}>
          <a>{title}</a>
        </Link>
      )}

    <style jsx>{`
      .designers {
        margin: 40px 0;
      }

      a {
        display: block;
        color: #000;
        text-decoration: underline;
        margin-bottom: 4px;
      }
    `}</style>
    </div>
  )
}