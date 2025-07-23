'use client'

import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import { BloomFilterVisualizer } from './BloomFilterVisualizer'

export function BloomFilterContent() {
  return (
    <Flex direction="column" flex={1} bg="dark.900" position="relative">
      {/* Header */}
      <Box
        borderBottom="1px solid"
        borderColor="dark.700"
        px={8}
        py={4}
        bg="dark.800"
      >
        <Text fontSize="xl" fontWeight="bold" color="white">
          Bloom Filter
        </Text>
      </Box>

      {/* Bloom Filter Visualizer */}
      <BloomFilterVisualizer />
    </Flex>
  )
} 