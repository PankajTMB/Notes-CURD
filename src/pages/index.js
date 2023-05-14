import { useState, createContext, useEffect } from "react";
import NoteList from "../components/noteList";
import NoteHeader from "../components/noteHeader";
import NoteDetail from "../snippet/noteDetail";

export const NoteDetailContext = createContext(null);

const IndexPage = () => {
    const [noteDetailData, setNoteDetailData] = useState({
        showForm: false,
        type: "",
        existingNotes: [],
        filterData: [],
        getData: true,
        data: {}
    })

    useEffect(() => {
        let notes = localStorage.getItem("notes");
        if (notes) {
            setNoteDetailData((prevalue) => {
                return {
                    ...prevalue,
                    getData: false,
                    existingNotes: JSON.parse(notes)
                }
            });
        }
    }, [noteDetailData.getData]);

    return (
        <>
            <div className="main">
                <div className="container">
                    <NoteDetailContext.Provider value={{ noteDetailData, setNoteDetailData }}>
                        <NoteHeader />
                        <NoteList />
                        {noteDetailData.showForm && <NoteDetail />}
                    </NoteDetailContext.Provider>
                </div>
            </div>
        </>
    )
}

export default IndexPage;