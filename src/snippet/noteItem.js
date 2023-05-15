import { useContext } from "react";
import { NoteDetailContext } from "../pages";

const NoteItem = ({ item: data, item: { title, updatedAt } }) => {
    const { noteDetailData, setNoteDetailData } = useContext(NoteDetailContext);
    const onDelete = () => {
        let existingNotes = noteDetailData.existingNotes;
        let index = existingNotes.findIndex((item) => {
            return item.id === data.id
        });
        existingNotes.splice(index, 1)
        localStorage.setItem("notes", JSON.stringify(existingNotes));
        setNoteDetailData((prevalue) => ({ ...prevalue, getData: true }))
    }
    return (
        <>
            {/* note Heading */}
            <h3 className="note_title">{title}</h3>
            {/* note Heading */}
            <h3 className="note_title">{updatedAt.split('T')[0]}</h3>
            {/* note Icons */}
            <div className="note_icons">
                <button className="view_icon" onClick={() => { setNoteDetailData((prevalue) => ({ ...prevalue, data: data, showForm: true, type: "view" })) }}>
                    <svg height={'20px'} fill="#0072e7" focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="Visibility">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                </button>
                <button className="edit_icon" onClick={() => { setNoteDetailData((prevalue) => ({ ...prevalue, data: data, showForm: true, type: "edit" })) }}>
                    <svg height={'20px'} fill="#0072e7" focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="Edit">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                </button>
                <button className="delete_icon" onClick={onDelete}>
                    <svg height={'20px'} fill="#eb0014" focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="Delete">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default NoteItem;