const mongoose = require('mongoose');

const mongodbURL = `mongodb+srv://sam:dragonfruit2020@cluster0-ttgy0.mongodb.net/dev-don?retryWrites=true&w=majority`;
mongoose.connect(mongodbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
