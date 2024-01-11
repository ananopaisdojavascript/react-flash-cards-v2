import Sequelize from "sequelize"

const sequelize = new Sequelize(
  "postgres://scxrloqh:aTup9lg5VbLN4AhozoIBcilQTmksheVA@batyr.db.elephantsql.com/scxrloqh",
  {
    dialect: "postegres",
    define: {
      timestamps: false
    }
  }
)

export default sequelize