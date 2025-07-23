'use client'

import { 
  Box, 
  VStack, 
  Text, 
  Button, 
  Icon,
  useColorModeValue,
  Divider
} from '@chakra-ui/react'
import { FiGitBranch, FiFilter } from 'react-icons/fi'

interface Algorithm {
  id: string
  name: string
  description: string
  icon: any
}

const algorithms: Algorithm[] = [
  {
    id: 'mpt',
    name: 'MPT',
    description: 'Merkle Patricia Trie',
    icon: FiGitBranch
  },
  {
    id: 'bloom',
    name: 'Bloom Filter',
    description: 'Probabilistic Data Structure',
    icon: FiFilter
  }
]

interface SidebarProps {
  activeAlgorithm: string | null
  onAlgorithmSelect: (algorithmId: string | null) => void
}

export function Sidebar({ activeAlgorithm, onAlgorithmSelect }: SidebarProps) {
  const bgGradient = useColorModeValue(
    'linear(to-b, cyber.600, cyber.800)',
    'linear(to-b, dark.800, dark.900)'
  )

  return (
    <Box
      w="300px"
      h="100vh"
      bgGradient={bgGradient}
      borderRight="2px solid"
      borderColor="neon.500"
      p={6}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: 'linear(45deg, neon.500, cyber.500, brand.500)',
        opacity: 0.1,
        zIndex: 0
      }}
    >
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        {/* Logo/Title */}
        <Box textAlign="center">
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            bgGradient="linear(to-r, neon.400, cyber.400)"
            bgClip="text"
            mb={2}
            cursor="pointer"
            onClick={() => onAlgorithmSelect(null)}
            _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s' }}
            transition="all 0.2s"
          >
            StateViz
          </Text>
          <Text fontSize="sm" color="gray.400">
            Blockchain Data Structures
          </Text>
        </Box>

        <Divider borderColor="neon.500" opacity={0.3} />

        {/* Home Button */}
        <Button
          variant={activeAlgorithm === null ? 'solid' : 'ghost'}
          colorScheme={activeAlgorithm === null ? 'neon' : 'gray'}
          justifyContent="flex-start"
          onClick={() => onAlgorithmSelect(null)}
          size="md"
          _hover={{
            bg: activeAlgorithm === null ? 'neon.600' : 'whiteAlpha.100',
            transform: 'translateX(4px)',
            transition: 'all 0.2s'
          }}
          transition="all 0.2s"
        >
          <Text fontSize="sm" fontWeight="semibold">
            🏠 Home
          </Text>
        </Button>

        {/* Algorithms List */}
        <Box>
          <Text 
            fontSize="sm" 
            color="gray.400" 
            mb={3}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Algorithms
          </Text>
          
          <VStack spacing={2} align="stretch">
            {algorithms.map((algo) => (
              <Button
                key={algo.id}
                variant={activeAlgorithm === algo.id ? 'solid' : 'ghost'}
                colorScheme={activeAlgorithm === algo.id ? 'neon' : 'gray'}
                justifyContent="flex-start"
                leftIcon={<Icon as={algo.icon} />}
                onClick={() => onAlgorithmSelect(algo.id)}
                size="md"
                _hover={{
                  bg: activeAlgorithm === algo.id ? 'neon.600' : 'whiteAlpha.100',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s'
                }}
                transition="all 0.2s"
              >
                <Box textAlign="left" flex={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {algo.name}
                  </Text>
                  <Text fontSize="xs" opacity={0.8}>
                    {algo.description}
                  </Text>
                </Box>
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Footer */}
        <Box mt="auto" pt={6}>
          <Text fontSize="xs" color="gray.500" textAlign="center">
            Built for exploring blockchain data structures
          </Text>
        </Box>
      </VStack>
    </Box>
  )
} 