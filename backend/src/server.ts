import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";
import { defineassociations } from "./models/associations";

// Importamos los modelos para que Sequelize los registre.
import "./modules/bicycles/bicycle.model";
import "./modules/brands/brand.model";
import "./modules/bicycle-details/bicycle-detail.model"
import "./modules/customers/customer.model"
import "./modules/orders/order.model"
import "./modules/order-items/order-item.model"
import "./modules/bicycle-models/bicycle-model.model"



async function startServer() {
  try {

    // Associations must be defined after the models are imported and before sync().
    defineassociations();

    await sequelize.authenticate();

    console.log("Conexión con MySQL establecida.");

    // sync() only creates MISSING tables. It does NOT add columns to existing ones:
    // drop the table or use sync({ alter: true }) once after adding a new FK column.
    await sequelize.sync();

    console.log("Modelos sincronizados.");

    app.listen(env.PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "No se pudo iniciar la aplicación:",
      error
    );

    process.exit(1);
  }
}

startServer();