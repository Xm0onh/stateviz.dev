'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'
import { WelcomePage } from '@/components/WelcomePage'
import { BloomFilterContent } from '@/components/BloomFilter/BloomFilterContent'

export default function Home() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<string | null>(null)

  const renderContent = () => {
    if (activeAlgorithm === null) {
      return <WelcomePage onAlgorithmSelect={setActiveAlgorithm} />
    }
    
    // Route to different algorithm components
    if (activeAlgorithm === 'mpt') {
      return <MainContent />
    }
    
    if (activeAlgorithm === 'bloom') {
      return <BloomFilterContent />
    }
    
    return <WelcomePage onAlgorithmSelect={setActiveAlgorithm} />
  }

  return (
    <Flex h="100vh" bg="dark.900">
      <Sidebar 
        activeAlgorithm={activeAlgorithm}
        onAlgorithmSelect={setActiveAlgorithm}
      />
      <Box flex={1} overflow="auto">
        {renderContent()}
      </Box>
    </Flex>
  )
} 