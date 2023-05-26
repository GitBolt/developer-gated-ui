/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Button, Flex, Text, Divider, Box, Icon } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import commonStyles from '@/styles/Common.module.css'
import { IoIosWallet, AiFillGithub } from 'react-icons/all';

export default function Start() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>

      <DefaultHead />
      <Navbar />

      <Grid
        boxSizing="border-box"
        placeContent="center"
        alignContent="center"
        overflow="hidden"
      >

        <Box
          left="-10rem"
          top="-25rem"
          w="70rem"
          h="70rem"
          filter="brightness(120%) blur(100px)"
          className={commonStyles.glow}
        >

        </Box>
        <Flex
          border="1px solid #27274A"
          gap="2rem"
          borderRadius="2rem"
          mt="5rem"
          w="65rem"
          padding="0 5rem"
          h="75rem"
          flexFlow="column"
          align="center"
          fontSize="2rem"
          color="white"
          bg="linear-gradient(134.22deg, #13131D 51.58%, #1D1D30 111.53%)"
        >

          <Text fontSize="4rem" mt="1rem" fontWeight={600}>
            Get Started
          </Text>

          <Divider borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="3.5rem"
            fontWeight={700}
            alignSelf="start"
          >Authorize Wallet</Text>

          <Text color="#4B4B67" fontSize="2.8rem">
            Connect wallet is required to verify and register your public key
          </Text>

          <Button
            h="6.5rem"
            _focus={{ transform: "scale(0.9)" }}
            w="35rem"
            fontSize="3.2rem"
            fontWeight={600}
            borderRadius="2rem"
            alignSelf="start"
            leftIcon={<Icon as={IoIosWallet} />}
            _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
            bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
          >
            Connect Wallet
          </Button>


          <Divider mt="2rem" borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="3.5rem"
            fontWeight={700}
            alignSelf="start"
          >Authorize GitHub</Text>

          <Text color="#4B4B67" fontSize="2.8rem">
            GitHub connection is required to check your profile and contributions from our list          </Text>

          <Button
            h="6.5rem"
            onClick={() => signIn()}
            w="35rem"
            fontSize="3.2rem"
            fontWeight={600}
            _focus={{ transform: "scale(0.9)" }}
            borderRadius="2rem"
            alignSelf="start"
            leftIcon={<Icon as={AiFillGithub} />}
            _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
            bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
          >
            Connect Wallet
          </Button>
        </Flex>

      </Grid>
    </>
  )
}
