import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuth] = useState()

	useEffect(() => {
		setAuth(localStorage.getItem('token') ? true : false)
	}, [])

	return (
		<AuthContext.Provider value={{ isAuthenticated, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
