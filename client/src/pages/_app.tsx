import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import { Wallet } from '@/contexts/walletContext';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

export default function App({ Component, pageProps: session, ...pageProps }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Wallet>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Wallet>
    </SessionProvider>
  )
}
