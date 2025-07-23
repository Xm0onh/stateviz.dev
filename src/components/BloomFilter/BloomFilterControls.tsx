'use client'

import {
  Flex,
  Input,
  Button,
  VStack,
  HStack
} from '@chakra-ui/react'

interface BloomFilterControlsProps {
  inputValue: string
  onInputChange: (value: string) => void
  onAddItem: () => void
  onCheckItem: () => void
  onClear: () => void
}

export function BloomFilterControls({
  inputValue,
  onInputChange,
  onAddItem,
  onCheckItem,
  onClear
}: BloomFilterControlsProps) {
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
          placeholder="Enter text to add/check (e.g., 'apple')"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, onAddItem)}
          bg="dark.800"
          border="2px solid"
          borderColor="dark.700"
          _focus={{
            borderColor: 'neon.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-neon-500)'
          }}
          _placeholder={{ color: 'gray.500' }}
          color="white"
          minW="300px"
        />
        <Button
          colorScheme="neon"
          onClick={onAddItem}
          px={6}
        >
          Add Item
        </Button>
        <Button
          colorScheme="cyan"
          variant="outline"
          onClick={onCheckItem}
          px={6}
        >
          Check Item
        </Button>
        <Button
          colorScheme="orange"
          variant="outline"
          onClick={onClear}
          px={6}
        >
          Clear Filter
        </Button>
      </Flex>
    </VStack>
  )
} 