'use client'

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Container,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { BloomFilterControls } from './BloomFilterControls'
import { BloomFilterVisualization } from './BloomFilterVisualization'
import { BloomFilterStats } from './BloomFilterStats'
import { SimpleBloomFilter } from '@/lib/bloomFilter'

export function BloomFilterVisualizer() {
  const [bloomFilter] = useState(() => new SimpleBloomFilter(32, 3)) // 32 bits, 3 hash functions
  const [inputValue, setInputValue] = useState('')
  const [addedItems, setAddedItems] = useState<string[]>([])
  const [filterBits, setFilterBits] = useState(new Array(32).fill(false))
  const [lastOperation, setLastOperation] = useState<{type: 'add' | 'check', item: string, result?: boolean}>()
  const toast = useToast()

  const updateVisualization = () => {
    setFilterBits([...bloomFilter.bitArray])
  }

  const handleAddItem = () => {
    if (!inputValue.trim()) {
      toast({
        title: 'Empty input',
        description: 'Please enter an item to add',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    bloomFilter.add(inputValue)
    setAddedItems(prev => [...prev, inputValue])
    setLastOperation({ type: 'add', item: inputValue })
    updateVisualization()
    setInputValue('')

    toast({
      title: 'Item added',
      description: `Added "${inputValue}" to filter`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleCheckItem = () => {
    if (!inputValue.trim()) {
      toast({
        title: 'Empty input',
        description: 'Please enter an item to check',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const result = bloomFilter.mightContain(inputValue)
    setLastOperation({ type: 'check', item: inputValue, result })
    
    const status = result ? 'info' : 'error'
    const title = result ? 'Might be present' : 'Definitely not present'
    const description = result 
      ? `"${inputValue}" might be in the filter (could be false positive)`
      : `"${inputValue}" is definitely not in the filter`

    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
    })
  }

  const handleClear = () => {
    bloomFilter.clear()
    setAddedItems([])
    setLastOperation(undefined)
    updateVisualization()
    
    toast({
      title: 'Filter cleared',
      description: 'All items removed from filter',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        {/* Info Box */}
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Bloom Filter Basics:</Text>
            <Text fontSize="sm">
              A space-efficient probabilistic data structure for testing set membership. 
              False positives are possible, but false negatives are not.
            </Text>
          </Box>
        </Alert>

        {/* Controls */}
        <BloomFilterControls
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAddItem={handleAddItem}
          onCheckItem={handleCheckItem}
          onClear={handleClear}
        />

        {/* Visualization */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="white">
            Filter Bits (32-bit array):
          </Text>
          <BloomFilterVisualization 
            bits={filterBits} 
            lastOperation={lastOperation}
            bloomFilter={bloomFilter}
          />
        </Box>

        {/* Statistics */}
        <BloomFilterStats 
          addedItems={addedItems}
          filterSize={32}
          hashFunctions={3}
          setBits={filterBits.filter(bit => bit).length}
        />
      </VStack>
    </Container>
  )
} 