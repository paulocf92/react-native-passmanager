import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage,
} from './styles';
import { useStorageData } from '../../hooks/storage';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  const { logins } = useStorageData();

  useEffect(() => {
    setData(logins);
    setSearchListData(logins);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setData(logins);
      setSearchListData(logins);
    }, [logins])
  );

  function handleFilterLoginData(search: string) {
    if (!search) {
      setSearchListData(data);
      return;
    }

    const re = new RegExp(search, 'i');
    const filtered = data.filter(login => re.test(login.title));

    setSearchListData(filtered);
  }

  return (
    <Container>
      <SearchBar
        placeholder='Pesquise pelo nome do serviço'
        onChangeText={value => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={item => item.id}
        data={searchListData}
        ListEmptyComponent={
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        }
        renderItem={({ item: loginData }) => {
          return (
            <LoginDataItem
              title={loginData.title}
              email={loginData.email}
              password={loginData.password}
            />
          );
        }}
      />
    </Container>
  );
}
