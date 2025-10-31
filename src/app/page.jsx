'use client'
import { Box, Button, Heading, Input, VStack, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, teal.400, blue.500)"
      color="white"
      p={4}
    >
      <VStack spacing={6} w="full" maxW="sm" bg="whiteAlpha.200" p={8} rounded="2xl" boxShadow="xl">
        <Heading size="lg">Smart Waste Bin</Heading>
        <Text fontSize="sm" color="whiteAlpha.700">Login ke sistem pengelolaan tempat sampah pintar</Text>
        <Input placeholder="Email" bg="white" color="black" />
        <Input placeholder="Password" type="password" bg="white" color="black" />
        <Button colorScheme="teal" w="full">Masuk</Button>
      </VStack>
    </Box>
  )
}
