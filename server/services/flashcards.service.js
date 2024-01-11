import FlashcardsRepository from "../repositories/flashcards.repository.js"

const createFlashcard = async(flashcard) => {
  return await FlashcardsRepository.insertFlashcard(flashcard)
}

const getFlashcards = async() => {
  return await FlashcardsRepository.getFlashcards()
}

const getFlashcard = async(id) => {
  return await FlashcardsRepository.getFlashcard(id)
}

const updateFlashcard = async(flashcard) => {
  return await FlashcardsRepository.updateFlashcard(flashcard)
}

const deleteFlashcard = async(id) => {
  await FlashcardsRepository.deleteFlashcard(id)
}

export default {
  createFlashcard,
  getFlashcards,
  getFlashcard,
  updateFlashcard,
  deleteFlashcard
}