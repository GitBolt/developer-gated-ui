/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Button, Flex, Text, Divider, Box, Icon } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import commonStyles from '@/styles/Common.module.css'
import { FaWallet, FaGithub, FaFileSignature, FaCheck } from 'react-icons/fa';
import { NextPage } from 'next'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import base58 from 'bs58'
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(module => module.WalletMultiButton), {
  ssr: false
});


require('@solana/wallet-adapter-react-ui/styles.css');


export const truncatedPublicKey = (publicKey: string, length?: number) => {
  if (!publicKey) return;
  if (!length) {
    length = 5;
  }
  return publicKey.replace(publicKey.slice(length, 44 - length), '...');
};

const Start: NextPage = () => {
  const { data: session } = useSession()
  console.log(session)
  const { publicKey, signMessage } = useWallet()
  const [sig, setSig] = useState<Uint8Array>()


  const sendReq = async () => {
    if (!session || !session.user || !sig) return

    const sendData = {
      signature: base58.encode(sig),
      publicKey: publicKey?.toBase58(),
      // @ts-ignore
      github: session?.user.username
    }
    console.log(sendData)
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/verify", {
      method: "POST",
      body: JSON.stringify(sendData)
    })

    const data = await res.json()
    console.log(data)
  }

  const createSignature = async () => {
    if (!signMessage) return
    const message = new TextEncoder().encode(`Signing this message for verification: ${+new Date()}`);
    const signature = await signMessage(message)
    setSig(signature)
    await sendReq()
  }



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
          bg="radial-gradient(31.43% 31.43% at 33.32% 55.26%, rgba(38, 38, 94, 0.42) 33.11%, rgba(30, 52, 130, 0.29) 100%, rgba(20, 27, 53, 0.5) 100%)"
          filter="brightness(120%) blur(100px)"
          className={commonStyles.glow}
        >

        </Box>
        <Flex
          mb="4rem"
          border="1px solid #27274A"
          gap="1.5rem"
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

          <Text fontSize="3rem" mt="1rem" fontWeight={600}>
            Get Started
          </Text>

          <Divider borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="2.4rem"
            opacity={publicKey ? "0.5" : "1"}
            fontWeight={700}
            alignSelf="start"
          >Authorize Wallet</Text>

          <Text color="#4B4B67" fontSize="2rem">
            Connect wallet is required to verify and register your public key
          </Text>

          <Flex justify="space-between" align="center" w="100%">
            <WalletMultiButton
              style={{
                height: "4.5rem",
                opacity: publicKey ? "0.5" : "1",
                width: "25rem",
                fontWeight: 600,
                borderRadius: "1.5rem",
                alignSelf: "start",
                fontSize: "2.2rem",
                background: "linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
              }}
            >
              {publicKey ? null : <Icon as={FaWallet} transform="translate(-0.5rem, 0)" />}
              {publicKey ? truncatedPublicKey(publicKey.toBase58()) : 'Connect Wallet'}
            </WalletMultiButton>

            <Box>
              {publicKey ? <Icon as={FaCheck} color="green" /> : null}
            </Box>
          </Flex>

          <Divider mt="2rem" borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="2.4rem"
            fontWeight={700}
            alignSelf="start"
            opacity={session && session.user ? "0.5" : "1"}
          >Authorize GitHub</Text>

          <Text color="#4B4B67" fontSize="2rem">
            GitHub connection is required to check your profile and contributions from our list
          </Text>


          <Flex justify="space-between" align="center" w="100%">

            <Button
              h="4.5rem"
              isDisabled={!publicKey}
              _focus={{ transform: "scale(0.9)" }}
              w="25rem"
              fontSize="2.2rem"
              opacity={session && session.user ? "0.5" : "1"}
              fontWeight={600}
              borderRadius="1.5rem"
              alignSelf="start"
              onClick={() => signIn()}
              leftIcon={<Icon as={FaGithub} />}
              _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
              bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
            >
              Connect GitHub
            </Button>

            <Box>
              {session && session.user ? <Icon as={FaCheck} color="green" /> : null}
            </Box>
          </Flex>

          <Divider mt="2rem" borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="2.4rem"
            fontWeight={700}
            alignSelf="start"
          >Sign Message</Text>

          <Text color="#4B4B67" fontSize="2rem">
            We need to verify a message signature to make sure that the public key is correct
          </Text>

          <Button
            h="4.5rem"
            _focus={{ transform: "scale(0.9)" }}
            w="25rem"
            fontSize="2.2rem"
            isDisabled={!publicKey || !session || !session.user}
            fontWeight={600}
            borderRadius="1.5rem"
            alignSelf="start"
            onClick={createSignature}
            leftIcon={<Icon as={FaFileSignature} />}
            _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
            bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
          >
            Sign Message
          </Button>


        </Flex>

      </Grid>
    </>
  )
}
export default Start