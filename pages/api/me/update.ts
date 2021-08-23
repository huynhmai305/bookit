import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { updateUserProfile } from "../../../controllers/authControllers";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateUserProfile);

export default handler;
