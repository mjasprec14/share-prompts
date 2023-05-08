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

export type Profile = {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (value: Prompt) => void;
  handleDelete: (value: Prompt) => void;
};

export type User = {
  id: string;
  username: string;
  email: string;
};
export interface Session {
  user: User;
}
