// Next
import { NextPage } from 'next'

// Components
import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Flex, Text, Box } from '@chakra-ui/react'

// Others
import commonStyles from '@/styles/Common.module.css'
import { getSession } from 'next-auth/react'


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
          top="12rem"
          left="10rem"
          h="70rem"
          className={commonStyles.glow}
        >
        </Box>

        <Flex mt="5rem" w="100%" flexFlow="column" align="center" justify="center">
          <Box h="30rem" w="30rem">
            <img src="/info.png" height="100%" width="100%" alt="info" />
          </Box>


          <Text textAlign="start" w="80%" mt="5rem" zIndex={10} className={commonStyles.gradientText} fontSize='7rem' fontWeight={700}>
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

export default Error

