'use client';
import { useEffect, useState, ChangeEvent, ReactElement } from 'react';
import PromptCard from './PromptCard';
import { Prompt } from '@typings';

type PromptCardListProp = {
  data: Prompt[];
  handleTagClick: (value: string) => void;
};

const PromptCardList = ({
  data,
  handleTagClick,
}: PromptCardListProp): ReactElement => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt, index) => (
        <PromptCard
          key={index}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default function Feed() {
  const [searchText, setSearchText] = useState<string>('');
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch('api/prompt');
      const data = await resp.json();

      setPrompts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={prompts}
        handleTagClick={() => {}}
      />
    </section>
  );
}
