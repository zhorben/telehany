import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import { VIEWER } from '../graphql/user'

import SignOut from './SignOut'

export default function Header() {
  const { loading, data } = useQuery(VIEWER)

  return (
    <header className="minimal">
      <aside>
        <Link href="/">
          <a className="logo">Zhorben</a>
        </Link>
      </aside>
      {loading === false &&
        <aside>
          <SignOut />
          {data.viewer === null &&
            <React.Fragment>
              <Link href="/signin">
                <a className="signIn">Sign In</a>
              </Link>
              <Link href="/signup">
                <a className="signUp">Sign Up</a>
              </Link>
            </React.Fragment>
          }
        </aside>
      }

      <style jsx>{`
        .logo {
          font-size: 1.5rem;
          font-weight: 500;
        }

        header {
          width: 1040px;
          max-width: 100%;
          padding: 0 20px;
          margin: auto;
          position: relative;
          transition: all 0.3s ease;
          z-index: 101;
          height: 80px;
        }

        header.minimal {
          justify-content: space-between;
        }

        button,
        a.signIn {
          text-transform: capitalize;
          color: #666;
          transition: color 0.2s ease 0s;
          border-width: 0px;
          border-style: initial;
          border-color: initial;
          border-image: initial;
          padding: 10px;
        }

        a.signIn:hover {
          color: #000;
        }

        a.signUp {
          background: rgb(0, 112, 243);
          padding: 6px 12px;
          color: #fff;
          border: 1px solid rgb(0, 112, 243);
          height: 32px;
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          font-weight: 500;
          border-radius: 4px;
          margin-left: 10px;
          line-height: 32px;
          transition: all 0.2s ease;
        }

        a.signUp:hover {
          background: transparent;
          color: rgb(0, 112, 243);
        }

        @media (min-width: 951px) {
          header {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </header>
  )
}