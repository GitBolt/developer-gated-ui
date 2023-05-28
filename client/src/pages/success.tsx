/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Button, Flex, Text, Divider, Box, Icon } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import commonStyles from '@/styles/Common.module.css'
import { FaWallet, FaGithub, FaFileSignature, FaCheck } from 'react-icons/fa';
import { NextPage } from 'next'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import base58 from 'bs58'
require('@solana/wallet-adapter-react-ui/styles.css');



const Success: NextPage = () => {

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
          w="70rem"
          h="70rem"
          bg="radial-gradient(31.43% 31.43% at 33.32% 55.26%, rgba(38, 38, 94, 0.42) 33.11%, rgba(30, 52, 130, 0.29) 100%, rgba(20, 27, 53, 0.5) 100%)"
          filter="brightness(120%) blur(100px)"
          className={commonStyles.glow}
        >
        </Box>

        <Flex mt="5rem" w="100%" flexFlow="column" align="center" justify="center">
          <Box h="30rem" w="30rem">
            <img src="/yay.png" height="100%" width="100%" alt="yay" />
          </Box>


          <Text textAlign="start" w="80%" mt="5rem" zIndex={10} className={commonStyles.gradientText} fontSize='7rem' fontWeight={700}>
            You Are Good To Go!
          </Text>

          <Text maxW="80%" zIndex={10} fontSize="4rem" color="#6C7CA3">
            You are now registered for receiving rewards for your open source contributions. Thanks for pushing projects and ecosystem forward! 
            If you have any questions, DM
            <a href="https://twitter.com/jacobvcreech" style={{ color: "#009fff" }} target="_blank"> @jacobvcreech</a>
          </Text>
        </Flex>
      </Grid>
    </>
  )
}
export default Success