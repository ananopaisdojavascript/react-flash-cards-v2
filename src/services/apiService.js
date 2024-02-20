import httpService from "./httpService";

// Obtenção de dados do backend
const getAllFlashcards = async () => {
  const allFlashcards = await httpService.read("/flashcard")
  return allFlashcards
}

const createFlashcard = async (title, description) => {
  const newFlashcard = await httpService.createFlashcard("/flashcard", { title, description })
  return newFlashcard
}

const editFlashcard = async (flashcardId, title, description) => {
  const flashcardEditing = await httpService.updateFlashcard("/flashcard", { flashcardId, title, description })
  return flashcardEditing
}

const deleteFlashcard = async (flashcardId) => {
  await httpService.eliminateFlashcard(`/flashcard/${flashcardId}`)
}

export default {
  getAllFlashcards,
  createFlashcard,
  editFlashcard,
  deleteFlashcard
}