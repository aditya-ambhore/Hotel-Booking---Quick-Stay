import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhook = async (req, res) => {
  console.log("Webhook Hit");
  console.log(req.body);
  try {
    const webhook = new Webhook(process.env.WEBHOOK_SECRET);

    webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const event = req.body;

    switch (event.type) {
      case "user.created": {
        const user = event.data;

        await User.create({
          clerkId: user.id,
          name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
          email: user.email_addresses[0].email_address,
          image: user.image_url,
          role: "customer",
        });

        break;
      }

      case "user.updated": {
        const user = event.data;

        await User.findOneAndUpdate(
          { clerkId: user.id },
          {
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            email: user.email_addresses[0].email_address,
            image: user.image_url,
          },
        );

        break;
      }

      case "user.deleted": {
        await User.findOneAndDelete({
          clerkId: event.data.id,
        });

        break;
      }

      default:
        break;
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
