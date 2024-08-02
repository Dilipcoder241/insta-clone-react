import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext();


export const MyProvider= ({ children }) => {
  const [loginUser, setloginUser] = useState({});
  const [posts , setPosts] = useState([]);
 


  return (
    <MyContext.Provider value={{ loginUser, setloginUser , posts , setPosts} }>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
