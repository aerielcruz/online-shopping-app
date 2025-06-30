import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user)
    if (Object.keys(parsedUser).length === 0) {
      return parsedUser
    }
  }
  return null
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};