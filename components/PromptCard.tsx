'use client';
import { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Prompt } from '@typings';

type PromptCardProps = {
  prompt: Prompt;
  handleTagClick?: (value: string) => void;
  handleEdit?: MouseEventHandler<HTMLParagraphElement>;
  handleDelete?: MouseEventHandler<HTMLParagraphElement>;
};

export default function PromptCard({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const { data: session }: any = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState('');

  const isEditable =
    session?.user.id === prompt.creator._id && pathName === '/profile';

  const handleCopy = () => {
    setCopied(prompt?.prompt);
    navigator.clipboard.writeText(prompt?.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={prompt?.creator.image}
            alt={`user photo`}
            height={40}
            width={40}
            className='rounded-full object-center object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {prompt?.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt?.creator.email}
            </p>
          </div>
        </div>

        <div
          className='copy_btn'
          onClick={handleCopy}
        >
          <Image
            src={
              copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt='copy image'
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>

      {isEditable ? (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      ) : null}
    </div>
  );
}
