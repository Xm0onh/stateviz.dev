'use client'

import {
  Flex,
  Input,
  Button,
  VStack,
  HStack
} from '@chakra-ui/react'

interface MPTControlsProps {
  keyInput: string
  valueInput: string
  onKeyInputChange: (value: string) => void
  onValueInputChange: (value: string) => void
  onAddKeyValue: () => void
  onRemoveKey: () => void
  onClear: () => void
  onLoadExample: (type: string) => void
}

export function MPTControls({
  keyInput,
  valueInput,
  onKeyInputChange,
  onValueInputChange,
  onAddKeyValue,
  onRemoveKey,
  onClear,
  onLoadExample
}: MPTControlsProps) {
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* Input Controls */}
      <Flex gap={3} wrap="wrap">
        <Input
          placeholder="Enter key (hex, e.g., 0x1234)"
          value={keyInput}
          onChange={(e) => onKeyInputChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, valueInput ? onAddKeyValue : () => {})}
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          _focus={{
            borderColor: 'neon.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-neon-500)'
          }}
          _placeholder={{ color: 'gray.500' }}
          color="white"
          minW="250px"
        />
        <Input
          placeholder="Enter value"
          value={valueInput}
          onChange={(e) => onValueInputChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, onAddKeyValue)}
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          _focus={{
            borderColor: 'neon.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-neon-500)'
          }}
          _placeholder={{ color: 'gray.500' }}
          color="white"
          minW="200px"
        />
        <Button
          colorScheme="neon"
          onClick={onAddKeyValue}
          px={6}
        >
          Add Key-Value
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={onRemoveKey}
          px={6}
        >
          Remove Key
        </Button>
        <Button
          colorScheme="orange"
          variant="outline"
          onClick={onClear}
          px={6}
        >
          Clear All
        </Button>
      </Flex>

      {/* Example Controls */}
      <HStack spacing={3} wrap="wrap">
        <Button
          colorScheme="cyber"
          variant="outline"
          size="sm"
          onClick={() => onLoadExample('single')}
        >
          Example: Single Leaf
        </Button>
        <Button
          colorScheme="cyber"
          variant="outline"
          size="sm"
          onClick={() => onLoadExample('branch')}
        >
          Example: Branch Node
        </Button>
        <Button
          colorScheme="cyber"
          variant="outline"
          size="sm"
          onClick={() => onLoadExample('extension')}
        >
          Example: Extension Node
        </Button>
        <Button
          colorScheme="cyber"
          variant="outline"
          size="sm"
          onClick={() => onLoadExample('complex')}
        >
          Example: Complex Trie
        </Button>
      </HStack>
    </VStack>
  )
} 