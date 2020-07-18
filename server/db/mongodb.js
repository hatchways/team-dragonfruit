const MongoClient = require("mongodb").MongoClient;

const dbName = "dev-don";
let db;

MongoClient.connect(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true },
	(err, client) => {
		if (err) return console.log(err);

		// Storing a reference to the database so you can use it later
		db = client.db(dbName);
		console.log(`Connected MongoDB: `, process.env.MONGODB_URL);
		console.log(`Database: ${dbName}`);
		db.collection("users")
			.indexInformation()
			.then((result) => console.log(result));
	},
);
