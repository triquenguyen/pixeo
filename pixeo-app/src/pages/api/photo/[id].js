import services from "@/services";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const photo = await services.photo.findByField("id", id);

    if (!photo)
      return res.status(404).json({ message: `Photo not found with id ${id}` });

    const blobDataUri = `data:${photo.filetype};base64,${photo.data}`;
    const [contentType, data] = blobDataUri.split(",");
    const imageData = Buffer.from(data, "base64");

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": imageData.length,
    });

    res.end(imageData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}
