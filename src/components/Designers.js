import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { DESIGNERS } from '../graphql/designer'

export default () => {
  const { loading, data } = useQuery(DESIGNERS)

  if (loading) {
    return <div>Loading...</div>
  }

  if (data && data.designers) {
    return (
      <div className="designers">
        <h3>Designers</h3>
  
        {data.designers.map(({ id, title }, index) =>
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
}