import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  if (!user) return null;

  try {
    const parsedUser = JSON.parse(user);
    if (parsedUser && typeof parsedUser === 'object' && Object.keys(parsedUser).length > 0) {
      return parsedUser;
    }
  } catch (err) {
    console.error("Failed to parse session user JSON:", err);
  }

  return null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromSession);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};