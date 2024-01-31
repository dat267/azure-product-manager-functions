const Cosmos = require("@azure/cosmos");
const products = require("./products.json");

// Get Cosmos DB connection string from command line argument
const connectionString = process.argv[2];

// Check if the connection string is provided
if (!connectionString) {
  console.error("Please provide the Cosmos DB connection string as a command line argument.");
  process.exit(1);
}

// create the cosmos client
const client = new Cosmos.CosmosClient(connectionString);

// Extract database and container information if needed
const databaseName = "tailwind"; // Replace with your actual database name
const containerName = "products"; // Replace with your actual container name

const database = client.database(databaseName);
const container = database.container(containerName);

// insert the items into Cosmos DB
for (const product of products) {
  try {
    container.items.create(product);
  } catch (err) {
    console.log(err.message);
  }
}
