'use client'

import {
  Box,
  Flex,
  Text,
  Container,
  VStack,
  HStack
} from '@chakra-ui/react'

export function MainContent() {
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
          Merkle Patricia Trie
        </Text>
      </Box>

      {/* Main Visualization Area */}
      <Box flex={1} p={8}>
        <Container maxW="container.xl" h="full">
          <VStack spacing={6} h="full">
            {/* Visualization Canvas */}
            <Box
              flex={1}
              w="full"
              bg="dark.800"
              border="2px solid"
              borderColor="dark.700"
              borderRadius="lg"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgGradient: 'radial(circle at 50% 50%, neon.500, transparent)',
                opacity: 0.05,
                zIndex: 0
              }}
            >
              <Flex
                h="full"
                align="center"
                justify="center"
                direction="column"
                position="relative"
                zIndex={1}
              >
                <Text fontSize="lg" color="gray.400" mb={4}>
                  MPT Visualization Area
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center" maxW="md">
                  This is where the interactive Merkle Patricia Trie visualization will be rendered.
                  Click "Start" to begin exploring the data structure.
                </Text>
              </Flex>
            </Box>

            {/* Controls/Info Panel */}
            <Box
              w="full"
              bg="dark.800"
              border="1px solid"
              borderColor="dark.700"
              borderRadius="lg"
              p={4}
            >
              <HStack spacing={8}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.400">Nodes</Text>
                  <Text fontSize="lg" fontWeight="bold" color="neon.400">0</Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.400">Depth</Text>
                  <Text fontSize="lg" fontWeight="bold" color="cyber.400">0</Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.400">Keys</Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.400">0</Text>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  )
} 