import services from "@/services";

const restHelper = (table) => ({
  create: async (req, res) => {
    try {
      const data = await services[table].create(req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.query;

      const itemExists = await services[table].findByField("id", id);

      if (!itemExists)
        return res
          .status(404)
          .json({ message: `${table} not found with id ${id}` });

      const data = await services[table].updateById(id, req.body);

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.query;

      const itemExists = await services[table].findByField("id", id);

      if (!itemExists)
        return res
          .status(404)
          .json({ message: `${table} not found with id ${id}` });

      await services[table].deleteById(id);

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.query;

      const item = await services[table].findByField("id", id);

      if (!item)
        return res
          .status(404)
          .json({ message: `${table} not found with id ${id}` });

      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
  list: async (req, res) => {
    try {
      const items = await services[table].list();

      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
});

export default restHelper;
