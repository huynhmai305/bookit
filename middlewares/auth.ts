import catchAsyncErrors from "./catchAsyncErrors";
import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = catchAsyncErrors(
  async (req: any, _res: any, next: any) => {
    const session = await getSession({ req });

    if (!session) {
      return next(new ErrorHandler("Login first to access to resource", 401));
    }

    req.user = session.user;
    next();
  }
);

export { isAuthenticatedUser };
