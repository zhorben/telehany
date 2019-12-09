import { withApollo } from '../apollo/client'

import Main from '../src/components/Main'
import privatePage from '../src/components/PrivatePage'

const Private = () => {

  return (
    <Main>
      private page
    </Main>
  )
}

export default withApollo(
  privatePage(Private)
)
