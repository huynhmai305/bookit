import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import { allAdminBookings } from "../../../../controllers/bookingControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export default handler;
