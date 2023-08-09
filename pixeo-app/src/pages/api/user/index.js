import controllers from "@/controllers";
import { hash } from "bcrypt";

const handlers = {
  POST: async (req, res) => {
    req.body.password = await hash(req.body.password, 10);
    controllers.user.create(req, res);
  },
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) return methodHandler(req, res);

  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
