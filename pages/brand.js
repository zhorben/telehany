import { withApollo } from '../apollo/client'
import { DESIGNER } from '../src/graphql/designer'
import { useQuery } from '@apollo/react-hooks'

import Main from '../src/components/Main'
import Header from '../src/components/Header'

const Brand = ({ id }) => {
  const { data } = useQuery(DESIGNER, {
    variables: { id }
  })

  return (
    <Main>
      <Header />

      {data && data.designer &&
        <div className="wrapper">
          <h1>{data.designer.title}</h1>
          <h2>{data.designer.fullTitle}</h2>
          <p>{data.designer.description}</p>
        </div>
      }

      <style jsx>{`
        p {
          line-height: 26px;
          font-size: 16px;
        }
      `}</style>
    </Main>
  )
}

Brand.getInitialProps = async ({ query: { id } }) => ({ id })

export default withApollo(Brand)