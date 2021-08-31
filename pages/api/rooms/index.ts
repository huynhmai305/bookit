import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { addRoom, allRooms } from "../../../controllers/roomControllers";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(allRooms);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(addRoom);

export default handler;
