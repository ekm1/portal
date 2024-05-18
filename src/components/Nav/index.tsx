'use client'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import ThemePicker from '@/components/ThemePicker/ThemePicker'

export const Nav = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleBackButtonClick = () => {
    if (window.history?.length && window?.history.length > 1) {
      router.back()
    } else {
      router.replace('/')
    }
  }

  const showBackButton = pathname !== '/'

  return (
    <header className='bg-base-200 sticky top-0 z-50'>
      <div className='navbar bg-base-100 rounded-box justify-between'>
        <div className='flex-none'>
          {showBackButton && <button
            className='btn btn-square btn-ghost'
            onClick={handleBackButtonClick}
          >
            <ArrowLeftIcon className='inline-block w-6 h-6 stroke-current' />
          </button>}
        </div>
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <span className='text-xl font-bold'>Portal</span>
        </div>
        <div className='flex-none'>
          <ThemePicker />
        </div>
      </div>
    </header>
  )
}