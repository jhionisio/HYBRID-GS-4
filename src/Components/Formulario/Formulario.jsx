
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const FormularioDiario = () => {
  const [nmRemedio, setNmRemedio] = useState('');
  const [descricaoRemedio, setDescricaoRemedio] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtTermino, setDtTermino] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleSubmit = async () => {
    try {
      const diaryData = {
        nmRemedio,
        descricaoRemedio,
        dtInicio,
        dtTermino,
        patientId
      };

      await axios.post('https://gshybrid-b5908-default-rtdb.firebaseio.com/diary.json', diaryData);

      Alert.alert('Sucesso', 'Agenda criada com sucesso!');
      setNmRemedio('');
      setDescricaoRemedio('');
      setDtInicio('');
      setDtTermino('');
      setPatientId('');
    } catch (error) {
      console.error('Erro ao criar agenda:', error);
      Alert.alert('Erro', 'Não foi possível criar a agenda. Por favor, tente novamente.');
    }
  };

  return (
    <View>
      <Text>Nome do Remédio:</Text>
      <TextInput
        value={nmRemedio}
        onChangeText={(text) => setNmRemedio(text)}
        placeholder="Digite o nome do remédio"
      />

      <Text>Descrição do Remédio:</Text>
      <TextInput
        value={descricaoRemedio}
        onChangeText={(text) => setDescricaoRemedio(text)}
        placeholder="Digite a descrição do remédio"
      />

      <Text>Data de Início:</Text>
      <TextInput
        value={dtInicio}
        onChangeText={(text) => setDtInicio(text)}
        placeholder="Digite a data de início"
      />

      <Text>Data de Término:</Text>
      <TextInput
        value={dtTermino}
        onChangeText={(text) => setDtTermino(text)}
        placeholder="Digite a data de término"
      />

      <Text>ID do Paciente:</Text>
      <TextInput
        value={patientId}
        onChangeText={(text) => setPatientId(text)}
        placeholder="Digite o ID do paciente"
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default FormularioDiario;
