'use client'

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Grid,
  GridItem,
  Card,
  CardBody,
  Divider
} from '@chakra-ui/react'
import { FiGitBranch, FiArrowRight } from 'react-icons/fi'

interface WelcomePageProps {
  onAlgorithmSelect: (algorithmId: string) => void
}

export function WelcomePage({ onAlgorithmSelect }: WelcomePageProps) {
  const algorithms = [
    {
      id: 'mpt',
      name: 'Merkle Patricia Trie',
      shortName: 'MPT',
      description: 'A cryptographic data structure used in Ethereum to efficiently store and verify state data.',
      features: ['Deterministic structure', 'Efficient proofs', 'Space optimization', 'Fast lookups'],
      icon: FiGitBranch,
      color: 'neon'
    }
  ]

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center">
          <Text 
            fontSize={{ base: '4xl', md: '6xl' }} 
            fontWeight="bold" 
            bgGradient="linear(to-r, neon.400, cyber.400, brand.400)"
            bgClip="text"
            mb={6}
          >
            StateViz
          </Text>
          <Text fontSize="xl" color="gray.300" mb={4} maxW="2xl" mx="auto">
            Interactive playground for blockchain data structures
          </Text>
          <Text fontSize="md" color="gray.500" maxW="xl" mx="auto">
            Explore and understand how blockchain protocols organize and manage data through interactive visualizations.
          </Text>
        </Box>

        <Divider borderColor="dark.700" />

        {/* Available Algorithms */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="white" mb={8} textAlign="center">
            Available Data Structures
          </Text>
          
          <Grid templateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(400px, 1fr))' }} gap={6}>
            {algorithms.map((algo) => (
              <GridItem key={algo.id}>
                <Card
                  bg="dark.800"
                  border="2px solid"
                  borderColor="dark.700"
                  _hover={{
                    borderColor: `${algo.color}.500`,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s'
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => onAlgorithmSelect(algo.id)}
                >
                  <CardBody p={8}>
                    <VStack align="start" spacing={6}>
                      {/* Header */}
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          bg={`${algo.color}.900`}
                          border="2px solid"
                          borderColor={`${algo.color}.500`}
                          borderRadius="lg"
                        >
                          <Icon as={algo.icon} size="24px" color={`${algo.color}.300`} />
                        </Box>
                        <Box>
                          <Text fontSize="xl" fontWeight="bold" color="white">
                            {algo.name}
                          </Text>
                          <Text fontSize="sm" color={`${algo.color}.300`} fontWeight="semibold">
                            {algo.shortName}
                          </Text>
                        </Box>
                      </HStack>

                      {/* Description */}
                      <Text color="gray.300" lineHeight="tall">
                        {algo.description}
                      </Text>

                      {/* Features */}
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.400" mb={3}>
                          Key Features:
                        </Text>
                        <VStack align="start" spacing={2}>
                          {algo.features.map((feature, index) => (
                            <HStack key={index} spacing={3}>
                              <Box
                                w={2}
                                h={2}
                                bg={`${algo.color}.400`}
                                borderRadius="full"
                              />
                              <Text fontSize="sm" color="gray.400">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      {/* Action Button */}
                      <Button
                        colorScheme={algo.color}
                        rightIcon={<Icon as={FiArrowRight} />}
                        w="full"
                        onClick={() => onAlgorithmSelect(algo.id)}
                        _hover={{
                          transform: 'translateX(4px)',
                          transition: 'all 0.2s'
                        }}
                        transition="all 0.2s"
                      >
                        Explore {algo.shortName}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Info Section */}
        <Box textAlign="center" py={8}>
          <Text fontSize="lg" color="gray.400" mb={4}>
            More algorithms coming soon...
          </Text>
          <Text fontSize="sm" color="gray.500">
            Build your understanding of blockchain data structures step by step
          </Text>
        </Box>
      </VStack>
    </Container>
  )
} 