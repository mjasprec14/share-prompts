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
  const [searchTimeOut, setSearchTimeOut] = useState<any>(0);
  const [searchedResults, setSearchedResults] = useState<Prompt[]>([]);
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch('api/prompt');
      const data = await resp.json();

      setAllPrompts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (text: string): Prompt[] => {
    const regex = new RegExp(text, 'i');
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={allPrompts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
}
