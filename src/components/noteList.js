import { useContext } from "react";
import { NoteDetailContext } from "../pages";
import NoteItem from "../snippet/noteItem";

const NoteList = () => {
    const { noteStateData: { filterData }, setNoteStateData } = useContext(NoteDetailContext);
    const shortNotes = (shortby) => {
        setNoteStateData(prevalue => {
            prevalue.filterData.sort(function compare(a, b) {
                if (shortby === "date") {
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt > b.createdAt) {
                        return -1;
                    }
                }
                else {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                }
                return 0;
            });
            return {
                ...prevalue,
                filterData
            }
        });
    }
    return (
        <>
            <ul className="note_list">
                <li className="note_item note-head">
                    <h4 className="note_list_heading note_text">
                        Title
                        <button onClick={() => { shortNotes("title") }}>
                            <svg height="18px" focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="ExpandLess">
                                <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                        </button>
                    </h4>
                    <h4 className="note_list_heading note_text">Description/Body</h4>
                    <h4 className="note_list_heading note_text">
                        Updated At
                        <button onClick={() => { shortNotes("date") }}>
                            <svg height="18px" focusable="false" aria-hidden="true" viewBox="0 0 24 24" title="ExpandLess">
                                <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                            </svg>
                        </button></h4>
                    <h4 className="note_list_heading note_text">Action</h4>
                </li>
                {filterData.length > 0 ?
                    filterData.map((item, index) => {
                        return (
                            <li key={item.title + index} className="note_item">
                                <NoteItem item={{ ...item }} />
                            </li>
                        )
                    })
                    : <li className="note_item note_message"> <h3 className="nodata_message">There is no notes to show</h3> </li>
                }
            </ul>
        </>
    )
}
export default NoteList;