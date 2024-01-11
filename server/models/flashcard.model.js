import Sequelize from "sequelize";
import db from "../repositories/db.js"

const Flashcard = db.define("flashcards", {
  flashcardId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { underscored: true })

export default Flashcard