'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryProvider({ 
  children 
}: { 
  children: ReactNode
}) {
  const [queryClient] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
    })
  )



  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left"/>
      {children}
    </QueryClientProvider>
  )
}