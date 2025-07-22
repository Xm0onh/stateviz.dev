'use client'

import {
  Box,
  Text,
  VStack
} from '@chakra-ui/react'

interface MPTNode {
  type: string
  key?: number[]
  value?: string
  branches?: (MPTNode | null)[]
  path?: number[]
  next?: MPTNode
  hash?: string
}

interface MPTVisualizationProps {
  root: MPTNode
}

export function MPTVisualization({ root }: MPTVisualizationProps) {
  const nibblesToHex = (nibbles: number[]) => {
    return nibbles.map(n => n.toString(16)).join('')
  }

  const visualizeNode = (node: MPTNode | null, depth = 0): JSX.Element => {
    if (!node || node.type === 'empty') {
      return (
        <Box
          bg="gray.600"
          border="2px dashed"
          borderColor="gray.500"
          borderRadius="lg"
          p={4}
          _hover={{ transform: 'translateX(2px)', transition: 'all 0.2s' }}
          transition="all 0.2s"
        >
          <Text fontWeight="bold" color="gray.300" mb={2}>
            EMPTY NODE
          </Text>
          <Text fontSize="sm" color="gray.400" fontFamily="mono">
            {depth === 0 ? 'The trie is empty - add some data!' : 'No data'}
          </Text>
        </Box>
      )
    }

    if (node.type === 'leaf') {
      const keyStr = node.key ? '0x' + nibblesToHex(node.key) : ''
      return (
        <Box
          bg="green.900"
          border="2px solid"
          borderColor="green.500"
          borderRadius="lg"
          p={4}
          _hover={{ transform: 'translateX(2px)', transition: 'all 0.2s' }}
          transition="all 0.2s"
        >
          <Text fontWeight="bold" color="green.200" mb={2}>
            LEAF NODE
          </Text>
          <Text fontSize="sm" color="green.100" fontFamily="mono" lineHeight="tall">
            Key (remaining): {keyStr}<br />
            Value: {node.value}
          </Text>
        </Box>
      )
    }

    if (node.type === 'branch') {
      return (
        <VStack align="stretch" spacing={3}>
          <Box
            bg="blue.900"
            border="2px solid"
            borderColor="blue.500"
            borderRadius="lg"
            p={4}
            _hover={{ transform: 'translateX(2px)', transition: 'all 0.2s' }}
            transition="all 0.2s"
          >
            <Text fontWeight="bold" color="blue.200" mb={2}>
              BRANCH NODE
            </Text>
            <Text fontSize="sm" color="blue.100" fontFamily="mono" lineHeight="tall">
              {node.value ? `Value: ${node.value}\n` : ''}
              16 branches (0-F):
            </Text>
          </Box>
          
          {node.branches && node.branches.map((branch, i) => {
            if (branch !== null && branch !== undefined) {
              return (
                <Box key={i} ml={8}>
                  <Text
                    fontWeight="bold"
                    color="blue.300"
                    mb={2}
                    fontSize="sm"
                  >
                    Branch {i.toString(16).toUpperCase()}:
                  </Text>
                  <Box ml={4}>
                    {visualizeNode(branch, depth + 1)}
                  </Box>
                </Box>
              )
            }
            return null
          })}
        </VStack>
      )
    }

    if (node.type === 'extension') {
      const pathStr = node.path ? nibblesToHex(node.path) : ''
      return (
        <VStack align="stretch" spacing={3}>
          <Box
            bg="orange.900"
            border="2px solid"
            borderColor="orange.500"
            borderRadius="lg"
            p={4}
            _hover={{ transform: 'translateX(2px)', transition: 'all 0.2s' }}
            transition="all 0.2s"
          >
            <Text fontWeight="bold" color="orange.200" mb={2}>
              EXTENSION NODE
            </Text>
            <Text fontSize="sm" color="orange.100" fontFamily="mono">
              Shared path: {pathStr}
            </Text>
          </Box>
          <Box ml={8}>
            {node.next && visualizeNode(node.next, depth + 1)}
          </Box>
        </VStack>
      )
    }

    if (node.type === 'hash') {
      return (
        <Box
          bg="purple.900"
          border="2px solid"
          borderColor="purple.500"
          borderRadius="lg"
          p={4}
          _hover={{ transform: 'translateX(2px)', transition: 'all 0.2s' }}
          transition="all 0.2s"
        >
          <Text fontWeight="bold" color="purple.200" mb={2}>
            HASH NODE
          </Text>
          <Text fontSize="sm" color="purple.100" fontFamily="mono" lineHeight="tall">
            Hash: {node.hash}<br />
            <Text as="span" fontSize="xs" opacity={0.8}>
              (Node too large - stored as hash reference)
            </Text>
          </Text>
        </Box>
      )
    }

    return <Box>Unknown node type</Box>
  }

  return (
    <Box
      bg="dark.800"
      border="2px solid"
      borderColor="dark.700"
      borderRadius="lg"
      p={6}
      minH="300px"
    >
      {visualizeNode(root)}
    </Box>
  )
} 