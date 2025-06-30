import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  if (!user) return null;

  const parsedUser = JSON.parse(user);
  return Object.keys(parsedUser).length > 0 ? parsedUser : null;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user))
    } else {
      const user = getUserFromSession()
      setUser(user)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};