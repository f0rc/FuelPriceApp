# setps to run the project
1. Clone the project
2. run the command `npm install` or `pnpm install`
3. run the command `docker-compose up -d` to start the database ( config in docker-compose.yml, -d flag is to run in background )
4. create a file named `.env` and copy the content of `.env.example` to it in the root directory
5. run the command `npm run dev` or `pnpm run dev` to start the server

# dependencies
1. nodejs (i think version 20+ does not work not sure install LTS to be safe or 19.x.x)
2. npm or pnpm
3. docker + docker-compose
