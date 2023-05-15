import { useState, createContext, useEffect } from "react";
import NoteList from "../components/noteList";
import NoteHeader from "../components/noteHeader";
import NoteDetail from "../snippet/noteDetail";

export const NoteDetailContext = createContext(null);

const LandingPage = () => {
    const [noteStateData, setNoteStateData] = useState({
        showForm: false,
        type: "",
        existingNotes: [],
        filterData: [],
        getData: true,
        data: {}
    })

    useEffect(() => {
        let notes = localStorage.getItem("notes") || [];
        setNoteStateData((prevalue) => {
            return {
                ...prevalue,
                getData: false,
                existingNotes: notes.length > 0 ? JSON.parse(notes) : []
            }
        });
    }, [noteStateData.getData]);

    return (
        <>
            <div className="main">
                <div className="container">
                    <NoteDetailContext.Provider value={{ noteStateData, setNoteStateData }}>
                        <NoteHeader />
                        <NoteList />
                        {noteStateData.showForm && <NoteDetail />}
                    </NoteDetailContext.Provider>
                </div>
            </div>
        </>
    )
}

export default LandingPage;