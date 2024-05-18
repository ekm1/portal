'use client'

import { ReactNode } from 'react'

export interface LoadingInfoProps {
  status: boolean
  error: string
  children?: ReactNode;
}

export function LoadingInfo({ status, error, children }: LoadingInfoProps) {
  return (
    <>
      {error && <h2>Something went wrong</h2>}
      {status && children}
    </>
  )
}