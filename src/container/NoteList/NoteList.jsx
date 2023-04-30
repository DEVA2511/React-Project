import { NoteAPI } from "api/note-api";
import { TextCard } from "components/TextCard/TextCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "store/notes/note-slice";
import s from "./style.module.css";
export function NoteList({ noteList }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function deleteNote_(note) {
    if (window.confirm("Delete Note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
    }
  }
  return (
    <div className={`row justify-content-center ${s.cards_container}`}>
      {noteList.map((note) => (
        <div key={note.id} className={s.card_container}>
          <TextCard
            title={note.title}
            subtitle={note.created_at}
            content={note.content}
            onClickTrash={() => deleteNote_(note)}
            onClick={() => navigate("notes/" + note.id)}
          />
        </div>
      ))}
    </div>
  );
}