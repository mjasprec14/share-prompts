'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import { Session } from 'next-auth';

type Post = {
  prompt: string;
  tag: string;
};

export default function CreatePrompt() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: '', tag: '' });

  const createPrompt = async (e: any) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const resp = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('Failed to Create Prompt: ', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}
