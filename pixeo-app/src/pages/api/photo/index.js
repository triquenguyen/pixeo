import controllers from "@/controllers";

const handlers = {
  GET: controllers.photo.list,
  POST: controllers.photo.create,
};

export default async function handler(req, res) {
  const methodHandler = handlers[req.method];

  if (methodHandler) return methodHandler(req, res);

  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export const config = {
  api: {
    bodyParser: { sizeLimit: "1gb" },
    responseLimit: false,
  },
};
