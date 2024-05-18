import React, { useMemo } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

export interface CardProps {
  title: string;
  description: string;
  highlighted: boolean;
  avatarUrl?: string;
}

export const Card = ({ title, description, avatarUrl, highlighted }: CardProps) => {
  const truncatedDescription = useMemo(() => description.length > 100 ? `${description.slice(0, 100)}...` : description, [description])
  const highlightClassName = useMemo(() => classNames({ 'animate-pulse duration-600': highlighted }), [highlighted])

  return (
    <div
      className={classNames('card bg-base-100 shadow-xl hover:bg-base-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105', highlightClassName)}>
      <div className='card-body'>
        <div className='avatar'>
          <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            {avatarUrl && <Image width={40} height={40} src={avatarUrl} alt='Avatar' priority />}
          </div>
        </div>
        <h2 className='card-title'>{title}</h2>
        <p className='card-description'>
          {truncatedDescription}
        </p>
      </div>
    </div>
  )
}
