'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import UserProfile from '@components/UserProfile';
import { Prompt } from '@typings';

export default function Profile() {
  const { data: session }: any = useSession();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await resp.json();
      setPrompts(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session]);

  const handleEdit = (prompt: Prompt): void => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: Prompt): Promise<void> => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPrompts = prompts.filter(
          (post) => post._id !== prompt._id
        );

        setPrompts(filteredPrompts);
      } catch (error: any) {
        throw new Error('Failed to Delete Prompt: ', error);
      }
    }
  };

  return (
    <div>
      <UserProfile
        name='My'
        desc='Welcome to your personalized page'
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
