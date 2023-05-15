import { useContext } from "react";
import { NoteDetailContext } from "../pages";
import NoteItem from "../snippet/noteItem";

const NoteList = () => {
    const { noteDetailData: { filterData } } = useContext(NoteDetailContext);
    return (
        <>
            <ul className="note_list">
                <li className="note_item note-head">
                    <h4 className="note_list_heading">Title</h4>
                    <h4 className="note_list_heading">Updated At</h4>
                    <h4 className="note_list_heading">Action</h4>
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