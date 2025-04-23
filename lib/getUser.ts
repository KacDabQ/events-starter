import connect from "@/db";
import Users from "@/models/Users";

const geAdminByEmail = async (email: string) => {
  try {
    await connect();
    const user = await Users.findOne({ email, admin: true });

    return user;
  } catch (error) {
    return null;
  }
};

export { geAdminByEmail };
