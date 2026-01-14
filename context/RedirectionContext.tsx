// context/RedirectionContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';

const RedirectionContext = createContext({
  triggerRedirect: false,
  setTriggerRedirect: (value: boolean) => {},
});

export const useRedirection = () => useContext(RedirectionContext);

export const RedirectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (triggerRedirect) {
      router.replace('/(auth)/signIn'); // Redirect to login page
      setTriggerRedirect(false); // Reset after redirection
    }
  }, [triggerRedirect, router]);

  return (
    <RedirectionContext.Provider value={{ triggerRedirect, setTriggerRedirect }}>
      {children}
    </RedirectionContext.Provider>
  );
};
