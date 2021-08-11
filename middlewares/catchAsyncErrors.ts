import { AnyKeys } from "mongoose";

// eslint-disable-next-line import/no-anonymous-default-export
export default (func: any) => (req: any, res: any, next: any) =>
  Promise.resolve(func(req, res, next)).catch(next);
