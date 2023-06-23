# setps to run the project
1. Clone the project
2. run the command `npm install` or `pnpm install`
3. run the command `docker-compose up -d` to start the database ( config in docker-compose.yml, -d flag is to run in background )
4. create a file named `.env` and copy the content of `.env.example` to it in the root directory
5. runt he command `npx prisma db push` or `pnpm prisma db push` to create the database tables
6. run the command `npm run dev` or `pnpm run dev` to start the server

- to see the database easily with prisma studio run the command `npx prisma studio` or `pnpm prisma studio`

# dependencies
1. nodejs (i think version 20+ does not work not sure install LTS to be safe or 19.x.x)
2. npm or pnpm
3. docker + docker-compose


# TODO
- [x] create the database (schema table, models etc)
- [ ] profile page
  - [x] frontend ui + validation
  - [ ] backend 
- [x] signup/login/logout page (frontend, backend)
  - [x] frontend ui + validation
  - [x] backend api (signup, login, logout)
- [ ] customer get new quote component (frontend, backend)
  - [x] frontend ui 
  - [ ] backend api
- [ ] customer quoute history component (frontend, backend)
  - [ ] frontend ui
  - [ ] backend api