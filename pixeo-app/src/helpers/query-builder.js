import { executeQuery } from "@/config/db";

const queryBuilder = (table) => {
  return {
    create: async (payload) => {
      const query = `INSERT INTO ${table} (${Object.keys(payload).join(
        ", "
      )}) VALUES (${Object.keys(payload)
        .map(() => "?")
        .join(", ")})`;
      const values = Object.values(payload);

      return executeQuery({ query, values });
    },
    updateById: async (id, payload) => {
      const entries = Object.entries(payload).filter(([_, value]) => value);

      const query = `UPDATE ${table} SET ${entries
        .map(([key]) => `${key} = ?`)
        .join(", ")} WHERE id = ?`;
      const values = [...entries.map(([, value]) => value), id];

      return executeQuery({ query, values });
    },
    deleteById: async (id) => {
      const query = `DELETE FROM ${table} WHERE id = ?`;
      const values = [id];

      return executeQuery({ query, values });
    },
    findByField: async (field, value) => {
      const query = `SELECT * FROM ${table} WHERE ${field} = ?`;
      const values = [value];

      const response = await executeQuery({ query, values });

      return response[0];
    },
    list: async () => {
      const response = await executeQuery({ query: `SELECT * FROM ${table}` });
      return response;
    },
  };
};

export default queryBuilder;
