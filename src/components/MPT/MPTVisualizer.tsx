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
  Flex,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { MPTControls } from './MPTControls'
import { MPTVisualization } from './MPTVisualization'
import { MPTKeyValueList } from './MPTKeyValueList'
import { MPTLegend } from './MPTLegend'
import { SimpleMPT } from '@/lib/mpt'

export function MPTVisualizer() {
  const [mpt] = useState(() => new SimpleMPT())
  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [data, setData] = useState(new Map())
  const [root, setRoot] = useState(mpt.root)
  const toast = useToast()

  const updateVisualization = () => {
    setData(new Map(mpt.data))
    setRoot({ ...mpt.root })
  }

  const handleAddKeyValue = () => {
    if (!keyInput.trim() || !valueInput.trim()) {
      toast({
        title: 'Missing input',
        description: 'Please enter both key and value!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!keyInput.match(/^0x[0-9a-fA-F]+$/)) {
      toast({
        title: 'Invalid key format',
        description: 'Key must be in hex format (e.g., 0x1234)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    mpt.insert(keyInput, valueInput)
    updateVisualization()
    setKeyInput('')
    setValueInput('')

    toast({
      title: 'Key-value added',
      description: `Added ${keyInput}: ${valueInput}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleRemoveKey = () => {
    if (!keyInput.trim()) {
      toast({
        title: 'Missing key',
        description: 'Please enter a key to remove!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    mpt.remove(keyInput)
    updateVisualization()
    setKeyInput('')

    toast({
      title: 'Key removed',
      description: `Removed ${keyInput}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleClear = () => {
    mpt.clear()
    updateVisualization()
    
    toast({
      title: 'Trie cleared',
      description: 'All data has been removed',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  const loadExample = (type: string) => {
    mpt.clear()
    
    switch (type) {
      case 'single':
        mpt.insert('0x1234', 'Hello World')
        break
      case 'branch':
        mpt.insert('0x1234', 'Value 1')
        mpt.insert('0x1235', 'Value 2')
        mpt.insert('0x2345', 'Value 3')
        break
      case 'extension':
        mpt.insert('0x12345678', 'First')
        mpt.insert('0x12345679', 'Second')
        mpt.insert('0x1234567a', 'Third')
        break
      case 'complex':
        mpt.insert('0x1234', 'Apple')
        mpt.insert('0x1235', 'Banana')
        mpt.insert('0x1245', 'Cherry')
        mpt.insert('0x1345', 'Date')
        mpt.insert('0x2345', 'Elderberry')
        mpt.insert('0xabcd', 'Fig')
        mpt.insert('0xabce', 'Grape')
        mpt.insert('0xabcdef', 'Honeydew')
        break
    }
    
    updateVisualization()
    
    toast({
      title: 'Example loaded',
      description: `Loaded ${type} example`,
      status: 'success',
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
            <Text fontWeight="bold">Quick Start:</Text>
            <Text fontSize="sm">
              Add key-value pairs to see how the trie structure changes. Try the example scenarios to see specific node types!
            </Text>
          </Box>
        </Alert>

        {/* Legend */}
        <MPTLegend />

        {/* Controls */}
        <MPTControls
          keyInput={keyInput}
          valueInput={valueInput}
          onKeyInputChange={setKeyInput}
          onValueInputChange={setValueInput}
          onAddKeyValue={handleAddKeyValue}
          onRemoveKey={handleRemoveKey}
          onClear={handleClear}
          onLoadExample={loadExample}
        />

        {/* Visualization */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="white">
            Trie Structure:
          </Text>
          <MPTVisualization root={root} />
        </Box>

        {/* Key-Value List */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="white">
            Stored Key-Value Pairs:
          </Text>
          <MPTKeyValueList data={data} />
        </Box>
      </VStack>
    </Container>
  )
} 