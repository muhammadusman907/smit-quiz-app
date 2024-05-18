import mongoose from "mongoose";
import "dotenv"
mongoose.connect (process.env.URI + "") ;

export {mongoose}