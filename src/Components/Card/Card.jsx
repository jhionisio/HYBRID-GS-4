import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, Button, TextInput } from 'react-native';

const Card = ({ idAgenda, nmRemedio, descricaoRemedio, dtInicio, dtTermino, patientId, setRefresh }) => {
    const [patientName, setPatientName] = useState('');
    const [editedRemedio, setEditedRemedio] = useState(nmRemedio);
    const [editedDescricao, setEditedDescricao] = useState(descricaoRemedio);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchPatientName = async () => {
            try {
                const response = await axios.get('https://gshybrid-b5908-default-rtdb.firebaseio.com/patient.json');
                if (response.data) {
                    const patientsArray = Object.values(response.data);
                        const foundPatient = patientsArray.find((patient) => patient.patientId === patientId);
                        if (foundPatient) {
                        setPatientName(foundPatient.nmPaciente);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do paciente:', error);
            }
        };
    
        fetchPatientName();
    }, [patientId]);
    

    const handleDelete = async (idAgenda) => {
        try {
            await axios.delete(`https://gshybrid-b5908-default-rtdb.firebaseio.com/diary/${idAgenda}.json`);
            console.log(idAgenda)
            setRefresh();
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir registro da agenda:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const updatedDetails = {
                nmRemedio: editedRemedio,
                descricaoRemedio: editedDescricao,
                dtInicio,
                dtTermino,
                patientName,
            };

            await axios.put(`https://gshybrid-b5908-default-rtdb.firebaseio.com/diary/${idAgenda}.json`, updatedDetails);
            setIsEditing(false);
            setRefresh();
        } catch (error) {
            console.error('Erro ao editar detalhes da agenda:', error);
        }
    };

    return (
        <View className="card">
            {isEditing ? (
                <View>
                    <TextInput
                        value={editedRemedio}
                        onChangeText={(text) => setEditedRemedio(text)}
                    />
                    <TextInput
                        value={editedDescricao}
                        onChangeText={(text) => setEditedDescricao(text)}
                    />
                    <Button title="Salvar Alterações" onPress={handleEdit} />
                </View>
            ) : (
                <View>
                    <Text>Nome do Remédio: {nmRemedio}</Text>
                    <Text>Descrição do Remédio: {descricaoRemedio}</Text>
                    <Text>Data de Início: {dtInicio}</Text>
                    <Text>Data de Término: {dtTermino}</Text>
                    <Text>Nome do Paciente: {patientName}</Text>
                    <View>
                        <Button title="Editar" onPress={() => setIsEditing(true)} />
                        <Button title="Excluir" onPress={() => handleDelete(idAgenda)} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default Card;
