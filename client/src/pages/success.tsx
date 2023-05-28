/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Flex, Text, Box } from '@chakra-ui/react'
import commonStyles from '@/styles/Common.module.css'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'

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


export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  return {
    props: {
      session
    }
  }
}


export default Success