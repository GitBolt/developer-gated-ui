/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Button, Flex, Text, Divider, Box, Icon } from '@chakra-ui/react'
import commonStyles from '@/styles/Common.module.css'
import { NextPage } from 'next'
require('@solana/wallet-adapter-react-ui/styles.css');



const Error: NextPage = () => {

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

        <Flex mt="4rem" w="100%" flexFlow="column" align="center" justify="center">
          <Box h="30rem" w="30rem">
            <img src="/error.png" height="100%" width="100%" alt="yay" />
          </Box>


          <Text textAlign="start" w="80%" mt="3rem" zIndex={10} className={commonStyles.gradientText} fontSize='7rem' fontWeight={700}>
            We Are Sorry To Inform You
          </Text>

          <Text maxW="80%" zIndex={10} fontSize="4rem" color="#6C7CA3">
           You are not in our list of open source Solana contributors. Do not be disappointed however. Keep learning and keep pushing!
          </Text>
        </Flex>
      </Grid>
    </>
  )
}
export default Error