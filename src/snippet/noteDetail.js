import { useContext, useState } from "react";
import { NoteDetailContext } from "../pages";
import Modal from "./modal";
import { toast } from "react-toastify";

const NoteDetail = () => {
    const { noteStateData, setNoteStateData } = useContext(NoteDetailContext);
    let [formData, setFomrData] = useState({
        title: "",
        body: "",
        ...noteStateData.data
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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteStateData.type !== "view") {
            if (!formData.title && !formData.body) { alert("Please Fill required feild") }
            let existingNotes = noteStateData.existingNotes;
            let date = new Date();
            let dateFormat = `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
            let newNote = {
                ...formData,
                updatedAt: dateFormat,
                ...(noteStateData.type === 'add' && { id: date, createdAt: dateFormat })
            };

            if (noteStateData.type === "add") {
                existingNotes.push(newNote);
            }
            else {
                let index = existingNotes.findIndex((item) => {
                    return item.id === noteStateData.data.id
                });
                existingNotes[index] = newNote;
            }
            localStorage.setItem("notes", JSON.stringify(existingNotes));
            setNoteStateData((prevalue) => ({ ...prevalue, showForm: false, type: "", getData: true }))
            toast(noteStateData.type === "add" ? "Note is Successfully Added" : "Note is Updated");
        }
    }

    return (
        <>
            <Modal>
                <form className="note_form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label className="form_label" htmlFor="title">Title *</label>
                        <input readOnly={noteStateData.type === "view" ? true : false} required id="title" name="title" type="text" placeholder="Enter title here" className="form_control" value={formData.title} onChange={updateFormData} />
                    </div>
                    <div className="form_group">
                        <label className="form_label" htmlFor="body">Description/Body *</label>
                        <textarea readOnly={noteStateData.type === "view" ? true : false} required id="body" name="body" placeholder="Enter Description/Body here" className="form_control form_control-textarea" value={formData.body} onChange={updateFormData}></textarea>
                    </div>
                    <div className="btn_group form_btns">
                        <button className="btn" type="button" onClick={() => { setNoteStateData((prevalue) => ({ ...prevalue, showForm: false, type: "" })) }}>Cancel</button>
                        {noteStateData.type !== "view" &&
                            <button className="btn" type="submit">{noteStateData.type === "edit" ? "Update" : "Submit"}</button>
                        }
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default NoteDetail;
