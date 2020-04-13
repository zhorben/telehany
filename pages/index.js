import { withApollo } from '../apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { VIEWER } from '../src/graphql/user'

import Main from '../src/components/Main'
import Header from '../src/components/Header'
import Designers from '../src/components/Designers'

function Index() {
  const viewerQuery = useQuery(VIEWER)

  console.log(viewerQuery, '--- viewerQuery index')

  if (viewerQuery.called) {
    // viewerQuery.refetch()
  }

  return (
    <Main>
      <Header viewerQuery={viewerQuery} />

      <div className="wrapper">      
        <h1>Mens Designer Clothes Since 2019</h1>
        <p>
          Mens designer clothes store Zhorben was founded in 2019 with the vision of being the leading Polish designer menswear independent. We are now official stockists of world renowned labels such as Barbour, Belstaff, CP Company, Fred Perry, Stone Island, Vivienne Westwood, Moncler and Y3 to name just a few. We also have a substantial range of mens designer footwear brands from the likes of Adidas Originals, Clarks Originals, Grenson, New Balance and Nike. We have a well-chosen collection of mens accessories from such fashion lines as the iconic Paul Smith and Comme Des Garcons.
        </p>

        <Designers />
      </div>

      <style jsx>{`
        p {
          font-size: 16px;
          line-height: 26px;
          text-align: justify;
        }
      `}</style>
      
    </Main>
  )
}

export default withApollo(Index)
