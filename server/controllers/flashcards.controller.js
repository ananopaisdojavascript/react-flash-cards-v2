/* eslint-disable no-undef */
import FlashcardsService from "../services/flashcards.service.js";

const createFlashcard = async (request, response, next) => {
  try {
    let flashcard = request.body
    const areTheFieldsValid = !flashcard.title || !flashcard.description

    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de título e descrição é obrigatório.")
    }
    flashcard = await FlashcardsService.createFlashcard(flashcard)
    logger.info(`POST /flashcard - ${JSON.stringify(flashcard)}`);
    response.send(flashcard)
  } catch (error) {
    next(error)
  }
}

const getFlashcards = async(request, response, next) => {
  try {
    response.send(await FlashcardsService.getFlashcards())
    logger.info("GET /flashcard")
  } catch(error) {
    next(error)
  }
}

const getFlashcard = async(request, response, next) => {
  try {
    response.send(await FlashcardsService.getFlashcard(request.params.id));
    logger.info("GET /flashcard/:id");
  } catch(error) {
    next(error)
  }
}

const updateFlashcard = async(request, response, next) => {
  try {
    let flashcard = request.body
    const areTheFieldsValid = !flashcard.flashcardId || !flashcard.title || !flashcard.description

    if(areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de título e descrição é obrigatório.")
    }
    flashcard = await FlashcardsService.updateFlashcard(flashcard)
    logger.info(`PUT /flashcard - ${JSON.stringify(flashcard)}`);
    response.send(flashcard)
  } catch(error) {
    next(error)
  }
}

const deleteFlashcard = async(request, response, next) => {
  try {
    await FlashcardsService.deleteFlashcard(request.params.id)
    response.end();
    logger.info(`DELETE /flashcard/:id - ${request.params.id}`);
  } catch(error) {
    next(error)
  }
}

export default {
  createFlashcard,
  getFlashcards,
  getFlashcard,
  updateFlashcard,
  deleteFlashcard
}