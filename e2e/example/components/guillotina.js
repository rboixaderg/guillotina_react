import React from 'react'
import { Guillotina } from 'react-gmi'
import { Auth } from 'react-gmi'
import { Login } from 'react-gmi'

import '../node_modules/react-gmi/dist/css/style.css'

const url = 'http://localhost:8080/'
const auth = new Auth(url)

export default function App() {
  const [isLogged, setLogged] = React.useState(auth.isLogged)

  const onLogin = () => {
    setLogged(true)
  }
  const onLogout = () => setLogged(false)

  auth.onLogout = onLogout

  return (
    <>
      {isLogged && <Guillotina auth={auth} url={url} />}
      {!isLogged && (
        <div className="columns is-centered">
          <div className="columns is-half">
            <Login onLogin={onLogin} auth={auth} />
          </div>
        </div>
      )}
    </>
  )
}