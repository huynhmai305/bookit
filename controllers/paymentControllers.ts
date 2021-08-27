import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import absoluteUrl from "next-absolute-url";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Room from "../models/room";
import paypal, { Payment, SDKError } from "paypal-rest-sdk";
import ErrorHandler from "../utils/errorHandler";

console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX, 1234);

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX}`,
  client_secret: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET_SANDBOX}`,
});

// generate paypal checkout session  =>  /api/checkout/:roomId
const paypalCheckout = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // get room details
    const room = await Room.findById(req.query.roomId);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    }

    // const { checkInDate, checkOutDate, daysOfStay, amount } = req.query;
    // get origin
    const { origin } = absoluteUrl(req);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/rooms/${room._id}`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: `${room.name}`,
                sku: `${room.category}`,
                price: `${room.pricePerPage}`,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: `${room.pricePerPage * 1}`,
          },
          description: "This is the payment description.",
        },
      ],
    };

    await paypal.payment.create(
      create_payment_json,
      (error: SDKError, payment: Payment) => {
        if (error) {
          return next(new ErrorHandler(error.message, 401));
        } else {
          console.log("Create Payment Response");
          if (payment.links) {
            for (let i = 0; i < payment?.links.length; i++) {
              if (payment?.links[i].rel === "approval_url") {
                res.redirect(payment.links[i].href);
              }
            }
            res.status(200).json(JSON.stringify(payment));
          }
        }
      }
    );
  }
);

// generate paypal checkout session success =>  /api/checkout/:roomId/success
const paypalCheckoutSuccess = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { paymentId, PayerID } = req.query;

    const execute_payment_json = {
      payer_id: `${PayerID}`,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: `25.00`,
          },
        },
      ],
    };

    paypal.payment.execute(
      `${paymentId}`,
      execute_payment_json,
      (error: SDKError, payment: Payment) => {
        if (error) {
          return next(new ErrorHandler(error.message, 401));
        } else {
          res.status(200).json(JSON.stringify(payment));
        }
      }
    );
  }
);

export { paypalCheckout, paypalCheckoutSuccess };
