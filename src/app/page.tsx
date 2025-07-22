'use client'

import { Box, Flex } from '@chakra-ui/react'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'

export default function Home() {
  return (
    <Flex h="100vh" bg="dark.900">
      <Sidebar />
      <MainContent />
    </Flex>
  )
} 