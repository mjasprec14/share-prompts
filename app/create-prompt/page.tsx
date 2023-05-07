'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

type Post = {
  prompt: string;
  tag: string;
};

export default function CreatePrompt() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: '', tag: '' });

  const createPrompt = async (e: any) => {};

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
