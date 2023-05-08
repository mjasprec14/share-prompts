'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import UserProfile from '@components/UserProfile';
import { Prompt } from '@typings';

export default function Profile() {
  const { data: session }: any = useSession();
  const [isProfile, setIsProfile] = useState<Prompt[]>([]);
  const handleEdit = () => {};

  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await resp.json();
      setIsProfile(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session]);

  return (
    <div>
      <UserProfile
        name='My'
        desc='Welcome to your personalized page'
        data={isProfile}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
