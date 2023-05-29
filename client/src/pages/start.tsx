// Next
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession, signIn, signOut } from 'next-auth/react';

// Components
import { useWallet } from '@solana/wallet-adapter-react';
import { Box, Button, Divider, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { FaWallet, FaGithub, FaFileSignature, FaCheck } from 'react-icons/fa';
import { DefaultHead } from '@/components/DefaultHead';
import { Navbar } from '@/components/Navbar';

// Utils
import commonStyles from '@/styles/Common.module.css';
import { CustomSession } from '@/types/session';
import base58 from 'bs58';

// Others
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
  const { data } = useSession()
  const session: CustomSession = data as CustomSession;

  const { publicKey, signMessage } = useWallet()
  const router = useRouter()

  const sendReq = async (signature: Uint8Array) => {
    if (!session || !session.user || !signature) return

    const sendData = {
      signature: base58.encode(signature),
      publicKey: publicKey?.toBase58(),
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": session.access_token,
      },
      body: JSON.stringify(sendData)
    })

    if (res.ok) {
      router.push("/success")
    } else {
      if (res.status == 409) {
        router.push("/already")
      } else {
        router.push("/error")
      }
    }

  }

  const createSignature = async () => {
    if (!signMessage) return
    const message = new TextEncoder().encode(`Signing this message for verification: ${+new Date()}`);
    const signature = await signMessage(message)
    await sendReq(signature)
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
          className={commonStyles.glow}
        >

        </Box>
        <Flex className={commonStyles.formBox}>

          <Text fontSize="3rem" mt="1rem" fontWeight={600}>
            Get Started
          </Text>

          <Divider borderColor="#27274A" />

          <Text
            color="#7C89FF"
            fontSize="2.4rem"
            fontWeight={700}
            alignSelf="start"
            opacity={session && session.user ? "0.5" : "1"}>
            Authorize GitHub
          </Text>

          <Text color="#4B4B67" fontSize="2rem">
            GitHub connection is required to check your profile and contributions from our list
          </Text>


          <Flex justify="space-between" align="center" w="100%">

            <Button
              h="4.5rem"
              _focus={{ transform: "scale(0.9)" }}
              w="25rem"
              fontSize="2.2rem"
              opacity={session && session.user ? "0.5" : "1"}
              fontWeight={600}
              borderRadius="1.5rem"
              onClick={() => session && session.user ? signOut() : signIn()}
              leftIcon={<Icon as={FaGithub} />}
              _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
              bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
            >
              {session && session.user ? 'Logout GitHub' : 'Connect GitHub'}
            </Button>

            <Box>
              {session && session.user ? <Icon as={FaCheck} color="green" /> : null}
            </Box>
          </Flex>
          <Divider mt="2rem" borderColor="#27274A" />

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
              disabled={!session || !session.user}
              style={{
                height: "4.5rem",
                opacity: (!session || !session.user) ? "0.6" : publicKey ? "0.5" : "1",
                width: "25rem",
                fontWeight: 600,
                borderRadius: "1.5rem",
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