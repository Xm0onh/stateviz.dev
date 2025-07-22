'use client'

import {
  Box,
  Flex,
  Text,
  VStack
} from '@chakra-ui/react'

interface MPTKeyValueListProps {
  data: Map<string, string>
}

export function MPTKeyValueList({ data }: MPTKeyValueListProps) {
  if (data.size === 0) {
    return (
      <Box
        bg="dark.800"
        border="2px solid"
        borderColor="dark.700"
        borderRadius="lg"
        p={6}
        textAlign="center"
      >
        <Text color="gray.500">No data stored yet</Text>
      </Box>
    )
  }

  return (
    <Box
      bg="dark.800"
      border="2px solid"
      borderColor="dark.700"
      borderRadius="lg"
      p={6}
    >
      <VStack spacing={3} align="stretch">
        {Array.from(data.entries()).map(([key, value], index) => (
          <Flex
            key={index}
            justify="space-between"
            align="center"
            p={4}
            bg="dark.700"
            borderRadius="md"
            border="1px solid"
            borderColor="dark.600"
            _hover={{
              bg: 'dark.600',
              transform: 'translateY(-1px)',
              transition: 'all 0.2s'
            }}
            transition="all 0.2s"
          >
            <Text
              fontWeight="bold"
              color="neon.300"
              fontFamily="mono"
              fontSize="sm"
            >
              {key}
            </Text>
            <Text color="gray.300" fontSize="sm">
              {value}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
} 