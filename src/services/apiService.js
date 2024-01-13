import { get, create, edit, eliminate } from "./httpService";

const URL = "http://localhost:3000/flashcard";

export const getAllFlahscards = async () => {
  const allFlashcards = await get(`${URL}`)
  return allFlashcards
}

// export const createFlashcard = async (title, description) => {
//   const newFlashcard = create(`${URL}`, {
//     title,
//     description
//   })
//   return newFlashcard
// }

// export const updateFlashcard = async (flashcardId, title, description) => {
//   const update = edit(`${URL}/${flashcardId}`, {
//     flashcardId,
//     title,
//     description
//   })
//   return update
// }

// export const deleteFlashcard = async (flashcardId) => {
//   await eliminate(`${URL}/${flashcardId}`)
// }