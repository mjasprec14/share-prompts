import { Profile } from '@typings';
import PromptCard from './PromptCard';

export default function UserProfile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: Profile) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span> Profile
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((prompt, index) => (
          <PromptCard
            key={index}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
}
