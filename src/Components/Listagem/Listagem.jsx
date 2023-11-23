import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

const Listagem = () => {
    const [diaryDetails, setDiaryDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://gshybrid-b5908-default-rtdb.firebaseio.com/diary.json');
                if (response.data) {
                    const diaryArray = Object.keys(response.data).map((key) => ({
                        idAgenda: key,
                        ...response.data[key],
                    }));
                    setDiaryDetails(diaryArray);
                }
            } catch (error) {
                console.error('Erro ao buscar os detalhes da agenda:', error);
            }
        };

        fetchData();
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh((prevState) => !prevState);
    };

    return (
        <div>
            {diaryDetails.map((diary) => (
                <Card
                    key={diary.idAgenda}
                    idAgenda={diary.idAgenda}
                    nmRemedio={diary.nmRemedio}
                    descricaoRemedio={diary.descricaoRemedio}
                    dtInicio={diary.dtInicio}
                    dtTermino={diary.dtTermino}
                    patientId={diary.patientId}
                    setRefresh={handleRefresh}
                />
            ))}
        </div>
    );
};

export default Listagem;
