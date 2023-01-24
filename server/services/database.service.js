const { MongoClient } = require("mongodb");
const DB_CONSTS = require("../utils/env");

class DatabaseService {
  /**
   * DONE : Remplir une collection de données seulement si la collection est vide
   * @param {string} collectionName nom de la collection sur MongoDB
   * @param {Array} data tableau contenant les documents à mettre dans la collection
   */
  async populateDb (collectionName, data) {
    const database = this.db;
    const collection = database.collection(collectionName);
    const collectionArray = await collection.find({}).toArray();

    if (collectionArray.length === 0) {
      data.forEach(async (item) => {
        await collection.insertOne(item)
      });
    }
  }

  // Méthode pour établir la connection entre le serveur Express et la base de données MongoDB
  async connectToServer (uri) {
    try {
      this.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await this.client.connect();
      this.db = this.client.db(DB_CONSTS.DB_DB);
      // eslint-disable-next-line no-console
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

const dbService = new DatabaseService();

module.exports = { dbService };
