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

  const handleDelete = async (prompts: Prompt): Promise<void> => {};

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
