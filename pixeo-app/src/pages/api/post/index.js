import controllers from "@/controllers";

const handlers = {
  GET: controllers.post.list,
  POST: controllers.post.create,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) return methodHandler(req, res);

  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
