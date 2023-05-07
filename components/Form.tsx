type Props = {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: any;
  submitting: boolean;
  handleSubmit: (e: any) => void;
};
export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: Props) {
  return <div>Form</div>;
}
