import { useContext, useEffect, useState } from "react";
import { NoteDetailContext } from "../pages";

const NoteHeader = () => {
    const { noteStateData, setNoteStateData } = useContext(NoteDetailContext);
    let [formData, setFomrData] = useState({
        search: "",
        sort: "title",
    })

    // search debouncing 
    useEffect(() => {
        let debouncing = setTimeout(() => {
            let filterData = noteStateData.existingNotes.filter((item) => {
                return item.title.toLowerCase().includes(formData.search.toLowerCase())
            })
            setNoteStateData(prevalue => ({ ...prevalue, filterData }))
        }, 400)
        return () => clearTimeout(debouncing)
    }, [noteStateData.existingNotes, setNoteStateData, formData])

    // Update Form data funcion
    const updateFormData = (e) => {
        setFomrData(prevalue => {
            return {
                ...prevalue,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            <div className="note_header">
                <form className="search_form" onSubmit={(e) => e.preventDefault()}>
                    <div className="search_input_wrap">
                        <label htmlFor="search" className="search_label">
                            <svg focusable="false" height="24px" aria-hidden="true" viewBox="0 0 24 24" title="Search">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                        </label>
                        <input id="search" className="form_control" type="search" name="search" placeholder="Search by title" value={formData.search} onChange={updateFormData} />
                    </div>
                </form>
                <button className="btn" onClick={() => { setNoteStateData((prevalue) => ({ ...prevalue, showForm: true, type: "add", data: {} })) }}>
                    Add New Note
                </button>
            </div>

        </>
    )
}
export default NoteHeader;