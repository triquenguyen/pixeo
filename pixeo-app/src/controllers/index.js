import restHelper from "@/helpers/rest-helper";

const controllers = {
  user: restHelper("user"),
  post: restHelper("post"),
  photo: restHelper("photo"),
  follow: restHelper("follow"),
  interaction: restHelper("interaction"),
  tag: restHelper("tag"),
  interest: restHelper("interest"),
};

export default controllers;
