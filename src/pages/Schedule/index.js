import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../service/api';


const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    
    const PAGE_NUMBER = 0;
    const PAGE_SIZE = 50;
    
    const { id: event_id } = useParams();

    const getSchedules = async () => {
        try {
            const token = localStorage.getItem("@events-npds/token");
            const response = await api.get(`/events/${event_id}/schedule?pageNumber=${PAGE_NUMBER}&pageSize=${PAGE_SIZE}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSchedules(response.data);
        } catch (e) {
            alert("err");
        }
    }

    useEffect(() => {
        getSchedules();
    }, [])

    return (
        <div>
            <h1>Programações do evento</h1>
            <hr/>
            <a href={`/events/${event_id}/schedule/new`}>Criar</a>
            <ul>
                {schedules.map((item) => <li key={item.id}>{item.name} - Horário: {item.beginTime+ ":00"}</li>)}
            </ul>
        </div>
    );
}

export default Schedules;