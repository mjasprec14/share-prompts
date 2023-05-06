'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export default function Nav() {
  const isUserLoggedIn: boolean = true;
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link
        href='/'
        className='flex gap-2 flex-center'
      >
        <Image
          src='/assets/images/logo.svg'
          alt='Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link
              href='create-prompt'
              className='black_btn'
            >
              Create Post
            </Link>

            <button
              type='button'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                alt='Profile link'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    signIn(provider.id)
                  }
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              alt='Profile link'
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    signIn(provider.id)
                  }
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}