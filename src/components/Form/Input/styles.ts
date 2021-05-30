import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  margin-top: ${RFValue(26)}px;
`;

export const Label = styled.Text`
  font-family: 'Poppins_500Medium';
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.default.primary};
  margin-bottom: 8px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.default.error};
  margin-bottom: ${RFValue(4)}px;
`;

export const FormInput = styled(TextInput)`
  padding: ${RFValue(15)}px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.default.secondary};
  color: ${({ theme }) => theme.colors.default.primary};
  background-color: ${({ theme }) => theme.colors.default.shape};
  font-size: ${RFValue(14)}px;
`;
