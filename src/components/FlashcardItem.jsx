import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function FlashcardItem({
  children:
  flashcard,
  onDelete = null,
  onEdit = null
}) {
  const { title, description } = flashcard;

  function handleDeleteFlashcard() {
    if (onDelete) {
      onDelete(flashcard.flashcardId);
    }
  }

  function handleEditFlashcard() {
    if (onEdit) {
      onEdit(flashcard);
    }
  }
  return (
    <div className="border p-2 m-2">
    <ul>
      <li>
        <strong>Título: </strong> <span>{title}</span>
      </li>
      <li>
        <strong>Descrição: </strong> <span>{description}</span>
      </li>
    </ul>

    <div className="mt-4 flex flex-row items-center justify-end space-x-2">
      <FaEdit
        className="cursor-pointer"
        size={24}
        onClick={handleEditFlashcard}
      />
      <FaTrashAlt
        className="cursor-pointer"
        size={24}
        onClick={handleDeleteFlashcard}
      />
    </div>
  </div>
  )
}
