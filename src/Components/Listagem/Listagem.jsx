import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

const Listagem = () => {
    const [diaryDetails, setDiaryDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/diary/list');
                setDiaryDetails(response.data);
            } catch (error) {
                console.error('Erro ao buscar os detalhes da agenda:', error);
            }
        };

        fetchData();
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(prevState => !prevState);
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