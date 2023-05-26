/* eslint-disable @next/next/no-img-element */

import { DefaultHead } from '@/components/DefaultHead'
import { Navbar } from '@/components/Navbar'
import { Box, Grid, Text, Flex, Button } from '@chakra-ui/react'
import commonStyles from '@/styles/Common.module.css'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <>

      <DefaultHead />
      <Navbar />

      <Grid boxSizing="border-box" alignContent="start" overflow="hidden">

        <Box
          ml="calc(50% - 25rem)"
          className={commonStyles.glow}
        >
        </Box>

        <Flex mt="10rem" zIndex={2} color="#475A9E" justify="center" align="center" gap="1rem">
          <Text fontSize="4rem" fontWeight={600}>GM DEVELOPER</Text>
          <Box w="5.5rem" h="3.4rem">
            <img src="/icons/code.svg" width="100%" height="100%" alt="Line" />
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
          Contributions
        </Text>

        <Box zIndex={2} pos="absolute" top="40rem" w="100%">
          <img src="/line.svg" alt="Line" width="100%" height="100%" />
        </Box>
        <Box zIndex={2}  pos="absolute" top="42rem" w="100%">
          <img src="/line.svg" alt="Line" width="100%" height="100%" />
        </Box>
        <Box zIndex={2}  pos="absolute" top="44rem" w="100%">
          <img src="/line.svg" alt="Line" width="100%" height="100%" />
        </Box>

        <Button
          bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
          w="40rem"
          h="8rem"
          mt="10%"
          alignSelf="center"
          justifySelf="center"
          fontSize="4rem"
          color="white"
          _hover={{ bg: 'linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)' }}
          borderRadius="2rem"
          zIndex={2}
          rightIcon={<ChevronRightIcon w="5rem" h="5rem" />}
        >Get Started
        </Button>

        <Box
          ml="calc(50% - 75rem)"
          zIndex={0}
          pos="fixed"
          className={commonStyles.glowMuch}
        >
        </Box>
      </Grid>
    </>
  )
}
