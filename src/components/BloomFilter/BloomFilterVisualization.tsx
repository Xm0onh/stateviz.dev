'use client'

import {
  Box,
  Grid,
  Text,
  VStack
} from '@chakra-ui/react'
import { SimpleBloomFilter } from '@/lib/bloomFilter'

interface BloomFilterVisualizationProps {
  bits: boolean[]
  lastOperation?: {type: 'add' | 'check', item: string, result?: boolean}
  bloomFilter: SimpleBloomFilter
}

export function BloomFilterVisualization({ 
  bits, 
  lastOperation,
  bloomFilter 
}: BloomFilterVisualizationProps) {
  
  const getHighlightedPositions = (): number[] => {
    if (!lastOperation) return []
    return bloomFilter.getHashPositions(lastOperation.item)
  }

  const highlightedPositions = getHighlightedPositions()

  return (
    <VStack spacing={6} align="stretch">
      {/* Bit Array Visualization */}
      <Box
        bg="dark.800"
        border="2px solid"
        borderColor="dark.700"
        borderRadius="lg"
        p={6}
      >
        <Grid templateColumns="repeat(8, 1fr)" gap={2}>
          {bits.map((bit, index) => {
            const isHighlighted = highlightedPositions.includes(index)
            const isSet = bit
            
            let bgColor = 'gray.700'
            let borderColor = 'gray.600'
            
            if (isSet) {
              bgColor = 'red.600'
              borderColor = 'red.500'
            }
            
            if (isHighlighted) {
              borderColor = lastOperation?.type === 'add' ? 'neon.400' : 'cyan.400'
              if (!isSet && lastOperation?.type === 'add') {
                bgColor = 'neon.800'
              }
            }

            return (
              <Box
                key={index}
                w="50px"
                h="50px"
                bg={bgColor}
                border="2px solid"
                borderColor={borderColor}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                transition="all 0.3s"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s'
                }}
              >
                <Text fontSize="xs" color="gray.400" mb={1}>
                  {index}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {bit ? '1' : '0'}
                </Text>
              </Box>
            )
          })}
        </Grid>
      </Box>

      {/* Operation Result */}
      {lastOperation && (
        <Box
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          borderRadius="lg"
          p={4}
        >
          <Text fontSize="sm" color="gray.400" mb={2}>
            Last Operation:
          </Text>
          {lastOperation.type === 'add' ? (
            <Text color="neon.300">
              Added "{lastOperation.item}" → Hash positions: [{highlightedPositions.join(', ')}]
            </Text>
          ) : (
            <Text color={lastOperation.result ? 'cyan.300' : 'red.300'}>
              Checked "{lastOperation.item}" → {lastOperation.result ? 'Might be present' : 'Definitely not present'}
              <br />
              Hash positions: [{highlightedPositions.join(', ')}]
            </Text>
          )}
        </Box>
      )}
    </VStack>
  )
} 