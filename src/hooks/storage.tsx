import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageProviderProps {
  children: ReactNode;
}

interface LoginData {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface IStorageData {
  logins: LoginData[];
  loginStorageIsLoading: boolean;
  storeData(data: Omit<LoginData, 'id'>): Promise<void>;
}

const StorageDataContext = createContext({} as IStorageData);

function StorageProvider({ children }: StorageProviderProps) {
  const [logins, setLogins] = useState<LoginData[]>([] as LoginData[]);
  const [loginStorageIsLoading, setLoginStorageIsLoading] = useState(true);

  const loginStorageKey = '@passmanager:logins';

  async function storeData(data: Omit<LoginData, 'id'>) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...data,
    };

    try {
      const newData = [...logins, newLoginData];

      setLogins(newData);

      await AsyncStorage.setItem(loginStorageKey, JSON.stringify(newData));
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    async function loadStorageData() {
      const storedLogins = await AsyncStorage.getItem(loginStorageKey);

      if (storedLogins) {
        const loginData = JSON.parse(storedLogins) as LoginData[];
        setLogins(loginData);
      }

      setLoginStorageIsLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <StorageDataContext.Provider
      value={{
        logins,
        storeData,
        loginStorageIsLoading,
      }}
    >
      {children}
    </StorageDataContext.Provider>
  );
}

function useStorageData() {
  const context = useContext(StorageDataContext);

  return context;
}

export { StorageProvider, useStorageData };
