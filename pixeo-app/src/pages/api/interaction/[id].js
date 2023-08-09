import controllers from "@/controllers";

const handlers = {
  DELETE: controllers.interaction.delete,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) return methodHandler(req, res);

  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
