import { useContext, useState } from "react";
import { NoteDetailContext } from "../pages";
import Modal from "./modal";

const NoteDetail = () => {
    const { noteDetailData, setNoteDetailData } = useContext(NoteDetailContext);
    let [formData, setFomrData] = useState({
        title: "",
        body: "",
        ...noteDetailData.data
    })

    // Update Form data funcion
    const updateFormData = (e) => {
        setFomrData(prevalue => {
            return {
                ...prevalue,
                [e.target.name]: e.target.value
            }
        })
    }

    // Handle Submit Form data funcion and save into local storage
    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteDetailData.type !== "view") {
            if (!formData.title && !formData.body) { alert("Please Fill required feild") }
            let existingNotes = noteDetailData.existingNotes;
            let date = new Date();
            let newNote = {
                ...formData,
                updatedAt: date,
                ...(noteDetailData.type === 'add' && { id: date, createdAt: date })
            };

            if (noteDetailData.type === "add") {
                existingNotes.push(newNote);
            }
            else {
                let index = existingNotes.findIndex((item) => {
                    return item.id === noteDetailData.data.id
                });
                existingNotes[index] = newNote;
            }
            localStorage.setItem("notes", JSON.stringify(existingNotes));
            setNoteDetailData((prevalue) => ({ ...prevalue, showForm: false, type: "", getData: true }))
            alert(noteDetailData.type === "add" ? "Note is Successfully Added" : "Note is Updated")
        }
    }

    return (
        <>
            <Modal>
                <form className="note_form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label className="form_label" htmlFor="title">Title *</label>
                        <input readOnly={noteDetailData.type === "view" ? true : false} required id="title" name="title" type="text" placeholder="Enter title here" className="form_control" value={formData.title} onChange={updateFormData} />
                    </div>
                    <div className="form_group">
                        <label className="form_label" htmlFor="body">Body *</label>
                        <textarea readOnly={noteDetailData.type === "view" ? true : false} required id="body" name="body" placeholder="Enter body here" className="form_control" value={formData.body} onChange={updateFormData}></textarea>
                    </div>
                    <div className="btn_group form_btns">
                        <button className="btn" type="button" onClick={() => { setNoteDetailData((prevalue) => ({ ...prevalue, showForm: false, type: "" })) }}>Cancel</button>
                        {noteDetailData.type !== "view" &&
                            <button className="btn" type="submit">{noteDetailData.type === "edit" ? "Update" : "Submit"}</button>
                        }
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default NoteDetail;
