# Developer Gated UI

## Running

### Server
1. Head over to "backend" directory. Type `cd backend/`
2. Create a `.env` file with `DATABASE_URL` value having your Postgresql connection URI
3. Enter `yarn install && yarn dev`

*OR*

You can just run `docker-compose up --build` to start it. Make sure to change the database values in [docker-compose.yml](/backend//docker-compose.yml) file.


### Client
1. Head over to "client" directory. Type `cd client/`
2. Head over to [Github oAuth Apps](https://github.com/settings/developers) and create a new OAuth app. Save your secret and client ID
3. Create a `.env` file with the following values:
   - GITHUB_SECRET=your_oauth_secret
   - GITHUB_ID=your_client_id
   - NEXT_PUBLIC_API_URL=http://localhost:8000 // your backend server URL
4. Enter `yarn install && yarn dev`
