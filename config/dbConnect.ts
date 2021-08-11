import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(process.env.DB_LOCAL_URI!, {
    // "!" de fix loi error typescript env
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default dbConnect;
