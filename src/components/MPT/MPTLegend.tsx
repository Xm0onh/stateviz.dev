'use client'

import {
  Flex,
  HStack,
  Box,
  Text
} from '@chakra-ui/react'

export function MPTLegend() {
  const legendItems = [
    { color: 'gray.600', borderColor: 'gray.500', label: 'Empty Node' },
    { color: 'green.900', borderColor: 'green.500', label: 'Leaf Node' },
    { color: 'blue.900', borderColor: 'blue.500', label: 'Branch Node' },
    { color: 'orange.900', borderColor: 'orange.500', label: 'Extension Node' },
    { color: 'purple.900', borderColor: 'purple.500', label: 'Hash Node' }
  ]

  return (
    <Flex wrap="wrap" justify="center" gap={6}>
      {legendItems.map((item, index) => (
        <HStack key={index} spacing={2}>
          <Box
            w={5}
            h={5}
            bg={item.color}
            border="2px solid"
            borderColor={item.borderColor}
            borderRadius="md"
          />
          <Text fontSize="sm" color="gray.300">
            {item.label}
          </Text>
        </HStack>
      ))}
    </Flex>
  )
} 