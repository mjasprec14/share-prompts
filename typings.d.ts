export type Creator = {
  _id: string;
  email: string;
  image: string;
  username: string;
};

export type Prompt = {
  _id: string;
  prompt: string;
  tag: string;
  creator: Creator;
};
