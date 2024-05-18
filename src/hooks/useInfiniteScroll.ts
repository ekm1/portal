import { RefObject, useCallback, useEffect, useState } from 'react'

export const useInfiniteScroll = <T>(elementRef: RefObject<any>, method?: () => Promise<T[] | undefined> | undefined) => {
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [consecutiveFailures, setConsecutiveFailures] = useState(0)

  useEffect(() => {
    setHasMore(true)
  }, [method])

  const loadMoreData = useCallback(async () => {
    if (!hasMore || isLoading) {
      return
    }

    setIsLoading(true)

    try {
      if (method) {
        const newData = await method()


        if (!newData?.length) {
          setHasMore(false)
        }

        setConsecutiveFailures(0)
      }
    } catch (error) {
      setIsLoading(false)
      setConsecutiveFailures(prevFailures => prevFailures + 1)

      if (consecutiveFailures >= 2) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }, [hasMore, isLoading, consecutiveFailures, method])

  useEffect(() => {
    const options = {
      rootMargin: '150px',
      threshold: 0.3
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          loadMoreData()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isLoading, hasMore, loadMoreData, elementRef])

  return { isLoading, hasMore }
}
