import { useContext, useEffect, useState } from "react";
import { NoteDetailContext } from "../pages";

const NoteHeader = () => {
    const { noteDetailData, setNoteDetailData } = useContext(NoteDetailContext);
    let [formData, setFomrData] = useState({
        search: "",
        sort: "title",
    })

    // search debouncing 
    useEffect(() => {
        let debouncing = setTimeout(() => {
            let filterData = noteDetailData.existingNotes.filter((item) => {
                return item.title.includes(formData.search)
            })

            filterData.sort(function compare(a, b) {
                if (formData.sort === "date") {
                    if (a.updatedAt < b.updatedAt) {
                        return 1;
                    }
                    if (a.updatedAt > b.updatedAt) {
                        return -1;
                    }
                } else {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                }

                return 0;
            });
            setNoteDetailData(prevalue => ({ ...prevalue, filterData }))
        }, 400)
        return () => clearTimeout(debouncing)
    }, [noteDetailData.existingNotes, setNoteDetailData, formData])

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
                    <input className="form_control" type="search" name="search" placeholder="Search by title" value={formData.search} onChange={updateFormData} />
                </form>
                <button className="btn" onClick={() => { setNoteDetailData((prevalue) => ({ ...prevalue, showForm: true, type: "add", data: {} })) }}>
                    Add
                </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <select className="form_control form_control-select" name="sort" value={formData.sort} onChange={updateFormData} >
                    <option value="title">Title</option>
                    <option value="date">Date</option>
                </select>
            </form>
        </>
    )
}
export default NoteHeader;