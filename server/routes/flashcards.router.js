import express from "express"
import FlashcardsController from "../controllers/flashcards.controller.js"

const router = express.Router()

router.post("/", FlashcardsController.createFlashcard)
router.get("/", FlashcardsController.getFlashcards)
router.get("/:id", FlashcardsController.getFlashcard)
router.put("/", FlashcardsController.updateFlashcard)
router.delete("/:id", FlashcardsController.deleteFlashcard)

export default router