import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
	const [isAuthenticated, setAuth] = useState(
		localStorage.getItem('token') ? true : false
	)

	//Methods to change states
	const toggleAuth = () => setAuth(!isAuthenticated)

	return (
		<AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
			{props.children}
		</AuthContext.Provider>
	)

}

export default AuthContextProvider
