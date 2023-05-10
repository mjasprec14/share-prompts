'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { Session } from 'next-auth';

type Post = {
  prompt: string;
  tag: string;
};

export default function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: '', tag: '' });

  useEffect(() => {
    const getPromptDetails = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);
      const data = await resp.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  //   const updatePrompt = async (e: any) => {
  //     e.preventDefault();

  //     setSubmitting(true);

  //     try {
  //       const resp = await fetch('/api/prompt/new', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           prompt: post.prompt,
  //           userId: session?.user?.id,
  //           tag: post.tag,
  //         }),
  //       });

  //       if (resp.ok) {
  //         router.push('/');
  //       }
  //     } catch (error) {
  //       console.log('Failed to Create Prompt: ', error);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  );
}
