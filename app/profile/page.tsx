'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import CurrentProfile from '@components/CurrentProfile';

export default function Profile() {
  return (
    <div>
      <CurrentProfile
        name='My'
        desc='Welcome to your personalized page'
        data={[]}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </div>
  );
}
