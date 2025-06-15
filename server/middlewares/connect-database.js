import mongoose from "mongoose";

export const connectDatabase = async (req, res, next) => {
	if (!global.mongoose) {
		global.mongoose = mongoose
		await global.mongoose.connect(process.env.DB_CONNECTION_STRING)
	}
	if (req) {
		req.dbClient = global.mongoose.connections[0].client
		return next()
	}
}
