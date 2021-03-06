import { useState } from "react";
import { useHistory, useParams } from "react-router";

import api from "../../../service/api";

const SchedulesForm = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [presenter, setPresenter] = useState("");
    const [localization, setLocalization] = useState("");
    const [beginDate, setBeginDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [beginTime, setBeginTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [workload, setWorkload] = useState("");

    const history = useHistory();
    const { id: event_id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("@events-npds/token");
            const response = await api.post(`/events/${event_id}/schedule`, {
                name,
                description,
                presenter,
                localization,
                beginDate,
                endDate,
                beginTime,
                endTime,
                workload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            history.push(`/events/${event_id}/schedule`);
        } catch (e) {
            console.log(e);
            alert("err");
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#333", display: "flex", flex: 1, height: "100vh", padding: "20px"}}>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Apresentador</label>
            <input type="text" value={presenter} onChange={(e) => setPresenter(e.target.value)} />
            <label>Localization</label>
            <input type="text" value={localization} onChange={(e) => setLocalization(e.target.value)} />
            <label>Hora de inicio</label>
            <input type="text" value={beginTime} onChange={(e) => setBeginTime(e.target.value)} />
            <label>Hora de encerramento</label>
            <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <label>Data de inicio</label>
            <input type="date" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />
            <label>Data de encerramento</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <label>Dura????o</label>
            <input type="text" value={workload} onChange={(e) => setWorkload(e.target.value)} />
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default SchedulesForm;