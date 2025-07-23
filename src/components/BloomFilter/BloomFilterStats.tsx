'use client'

import {
  Box,
  HStack,
  VStack,
  Text,
  Grid,
  GridItem
} from '@chakra-ui/react'

interface BloomFilterStatsProps {
  addedItems: string[]
  filterSize: number
  hashFunctions: number
  setBits: number
}

export function BloomFilterStats({ 
  addedItems, 
  filterSize, 
  hashFunctions, 
  setBits 
}: BloomFilterStatsProps) {
  
  const fillRatio = ((setBits / filterSize) * 100).toFixed(1)
  const falsePositiveRate = Math.pow(setBits / filterSize, hashFunctions) * 100

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
      {/* Filter Statistics */}
      <GridItem>
        <Box
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          borderRadius="lg"
          p={6}
        >
          <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
            Filter Statistics
          </Text>
          
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <Text color="gray.400">Filter Size:</Text>
              <Text color="white" fontWeight="semibold">{filterSize} bits</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.400">Hash Functions:</Text>
              <Text color="white" fontWeight="semibold">{hashFunctions}</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.400">Set Bits:</Text>
              <Text color="red.400" fontWeight="semibold">{setBits}</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.400">Fill Ratio:</Text>
              <Text color="cyan.400" fontWeight="semibold">{fillRatio}%</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.400">Est. False Positive Rate:</Text>
              <Text color="orange.400" fontWeight="semibold">
                {falsePositiveRate < 0.1 ? '<0.1' : falsePositiveRate.toFixed(1)}%
              </Text>
            </HStack>
          </VStack>
        </Box>
      </GridItem>

      {/* Added Items */}
      <GridItem>
        <Box
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          borderRadius="lg"
          p={6}
        >
          <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
            Added Items ({addedItems.length})
          </Text>
          
          {addedItems.length === 0 ? (
            <Text color="gray.500" fontSize="sm">
              No items added yet
            </Text>
          ) : (
            <VStack spacing={2} align="stretch" maxH="200px" overflowY="auto">
              {addedItems.map((item, index) => (
                <Box
                  key={index}
                  bg="dark.700"
                  borderRadius="md"
                  p={2}
                  border="1px solid"
                  borderColor="dark.600"
                >
                  <Text fontSize="sm" color="neon.300" fontFamily="mono">
                    {item}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </GridItem>
    </Grid>
  )
} 