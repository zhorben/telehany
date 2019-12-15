import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Main from '../src/components/Main'
import Header from '../src/components/Header'

const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      displayName
    }
  }
`

const Index = () => {
  const { data: { viewer } } = useQuery(VIEWER)

  if (viewer) {
    return (
      <Main>

        <Header />

        <main>
          <h1>Этот сайт посвящен Жерко Артуру</h1>
          <p>Жерко Артур родился в Минске. До трех лет жил с бабушкой в деревне Телеханы. В 3 года переехал в Пинск. Там жил и учился до 15 лет. В 2011 году переехал в город Брест. Закончил Полесский гос университет в Пинске. Затем переехал в Польшу.</p>
        </main>

        <style jsx>{`
          a {
            margin-right: 20px;
          }
        `}</style>
        
      </Main>
    )
  }

  return null
}

export default withApollo(Index)
