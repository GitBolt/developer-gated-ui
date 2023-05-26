
import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Box, Grid, Text, Flex } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import commonStyles from '@/styles/Common.module.css'

export default function Home() {
  return (
    <>

      <DefaultHead />
      <Navbar />

      <Grid boxSizing="border-box" alignContent="start">

        <Box
          ml="calc(50% - 25rem)"
          className={commonStyles.glow}
        >
        </Box>

        <Flex mt="10rem" zIndex={2} color="#475A9E" justify="center" align="center" gap="1rem">
          <Text fontSize="4rem" fontWeight={600}>GM DEVELOPER</Text>
          <Box w="5.5rem" h="3.4rem">
            <img src="/icons/code.svg" width="100%" height="100%" />
          </Box>
        </Flex>

        <Text
        zIndex={2}
          mt="5rem"
          textAlign="center"
          fontSize="7.5rem"
          fontWeight={600}
          color="white"
          maxW="80%"
          justifySelf="center"
        >Get Rewarded For Your Open-Source
          <span style={{ color: "#5484FF" }}> Solana </span>
          Contributions</Text>
      </Grid>
    </>
  )
}
