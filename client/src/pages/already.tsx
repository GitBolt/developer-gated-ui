// Next
import { NextPage } from 'next'

// Components
import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Grid, Flex, Text, Box } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Others
import commonStyles from '@/styles/Common.module.css'
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
          top="12rem"
          left="10rem"
          h="70rem"
          className={commonStyles.glow}
        >
        </Box>

        <Flex mt="5rem" w="100%" flexFlow="column" align="center" justify="center">

          <CheckIcon h="30rem" w="30rem" color="green" />


          <Text textAlign="start" w="80%" mt="5rem" zIndex={10} className={commonStyles.gradientText} fontSize='7rem' fontWeight={700}>
            You Are Already In!
          </Text>

          <Text maxW="80%" zIndex={10} fontSize="4rem" color="#6C7CA3">
            You have already verified yourself and you are in the list for rewards now!
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