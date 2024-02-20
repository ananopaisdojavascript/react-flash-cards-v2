/* eslint-disable no-useless-catch */
import Flashcard from "../models/flashcard.model.js"

const insertFlashcard = async (flashcard) => {
  try {
    return await Flashcard.create(flashcard)
  } catch (error) {
    throw error
  }
}

const getFlashcards = async () => {
  try {
    return await Flashcard.findAll()
  } catch (error) {
    throw error
  }
}

const getFlashcard = async (id) => {
  try {
    return await Flashcard.findByPk(id)
  } catch (error) {
    throw error
  }
}

const updateFlashcard = async (flashcard) => {
  try {
    await Flashcard.update(flashcard, {
      where: {
        flashcardId: flashcard.flashcardId
      }
    })
    return getFlashcard(flashcard.flashcardId)
  } catch (error) {
    throw error
  }
}

const deleteFlashcard = async (id) => {
  try {
    await Flashcard.destroy({
      where: {
        flashcardId: id
      }
    })
  } catch (error) {
    throw error
  }
}

export default {
  insertFlashcard,
  getFlashcards,
  getFlashcard,
  updateFlashcard,
  deleteFlashcard
}