import { Flex } from '@chakra-ui/react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <Flex
      justify="center"
      align="center"
      h="7rem"
      color="#C7D0E7"
      fontSize="2rem"
      fontWeight={500}
      w="100%"
      gap="3rem"
      borderBottom="1px solid"
      borderColor="#23232d"
    >

      <a href="https://github.com/solana-foundation/solana-developer-data/blob/main/crawled_repos/solana_devs.csv" target="_blank">
        Developer List
      </a>
      <a href="https://github.com/GitBolt/developer-gated-ui" target="_blank">
        Source
      </a>
    </Flex>
  )
}