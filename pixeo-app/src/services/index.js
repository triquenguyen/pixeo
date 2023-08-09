import queryBuilder from "@/helpers/query-builder";
import { executeQuery } from "@/config/db";

const services = {
  user: queryBuilder("user"),
  post: {
    ...queryBuilder("post"),
    list: async () => {
      const response = await executeQuery({
        query: `SELECT 
  post.id as id,
  post.created_at as created_at,
  post.title as title,
  post.body as body,
  post.photo_id as photo_id,
  user.full_name as full_name,
  user.id as user_id,
  user.photo_id as user_photo_id,
  sum(case WHEN interaction.type = 'like' then 1 else 0 end) as likes,
  group_concat(interaction.user_id) as liked_by,
  group_concat(interaction.id) as like_ids,
  group_concat(follow.follower_id) as followed_by,
  group_concat(follow.id) as follow_ids
FROM
  post
  JOIN user ON post.user_id = user.id
  LEFT JOIN interaction ON post.id = interaction.post_id
  LEFT JOIN follow ON post.user_id = follow.following_id
GROUP BY post.id, user.id`,
      });

      return response;
    },
  },
  photo: queryBuilder("photo"),
  follow: queryBuilder("follow"),
  interaction: queryBuilder("interaction"),
  tag: queryBuilder("tag"),
  interest: queryBuilder("interest"),
};

export default services;
