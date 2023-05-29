# Client
This is the client code for collecting developer addresses using the gated UI.

Starting with the [index](/client/src/pages/index.tsx) page, which asks user to get started.
Leading to [start](/client/src/pages/start.tsx) page, where a user connects their GitHub, wallet and then sign a message.
Then, based on their status, they are redirected to either success, error or info (if already collected) page.