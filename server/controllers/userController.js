import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { id, first_name, last_name, email_addresses, image_url } = req.body;

    const email = email_addresses?.[0]?.email_address;

    let user = await User.findOne({ clerkId: id });

    if (!user) {
      user = await User.create({
        clerkId: id,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email,
        image: image_url,
        role: "customer",
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    }

    user.name = `${first_name || ""} ${last_name || ""}`.trim();
    user.email = email;
    user.image = image_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
