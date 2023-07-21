import { type AppRouter } from "../api/root";
import type { inferProcedureInput } from "@trpc/server";
import { createTestContext } from "./testingConfig";

describe("PROFILE API TEST", () => {
  test("[PROFILE API]: createProfile", async () => {
    const { caller, prismaMock } = createTestContext({
      session: true,
    });

    // const user1 = await prisma.user.upsert({
    //   where: {
    //     username: "TEST_USERNAME",
    //   },
    //   update: {},
    //   create: {
    //     id: "TEST_USER_ID",
    //     username: "TEST_USERNAME",
    //     password: "TEST_PASSWORD",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // });
    // console.log(user1);

    // const mockSession: ServerSession = {
    //   expires: new Date(),
    //   id: user1.id,
    //   sessionToken: "TEST_SESSION_TOKEN",
    //   User: user1,
    // };

    prismaMock.user.create.mockResolvedValue({
      id: "TEST_USER_ID",
      password: "test",
      username: "TEST_USERNAME",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.profile.upsert.mockResolvedValue({
      id: "TEST_PROFILE_ID",
      userId: "TEST_USER_ID",
      address1: "TEST_ADDRESS1",
      address2: "TEST_ADDRESS2",
      name: "TEST_FULLNAME",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "12345",
      address: "TEST_ADDRESS1 TEST_ADDRESS2",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["profile"]["createProfile"]>;

    const input: Input = {
      address1: "TEST_ADDRESS1",
      address2: "TEST_ADDRESS2",
      fullName: "TEST_FULLNAME",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "12345",
    };

    const result = await caller.profile.createProfile(input);
    //console.log(result);
    expect(result).toStrictEqual({
      profile: {
        id: "TEST_PROFILE_ID",
        userId: "TEST_USER_ID",
        address1: "TEST_ADDRESS1",
        address2: "TEST_ADDRESS2",
        name: "TEST_FULLNAME",
        city: "TEST_CITY",
        state: "TX",
        zipcode: "12345",
        address: ["TEST_ADDRESS1", "TEST_ADDRESS2"].join(" "),
        createdAt: result.profile.createdAt,
        updatedAt: result.profile.updatedAt,
      },
    });
  });

  test("[PROFILE API]: profileById", async () => {
    const { caller, prismaMock } = createTestContext({
      session: true,
    });

    prismaMock.user.create.mockResolvedValue({
      id: "TEST_USER_ID",
      password: "test",
      username: "TEST_USERNAME",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.profile.findUnique.mockResolvedValue({
      id: "TEST_PROFILE_ID",
      userId: "TEST_USER_ID",
      address1: "TEST_ADDRESS1",
      address2: "TEST_ADDRESS2",
      name: "TEST_FULLNAME",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "12345",
      address: "TEST_ADDRESS1 TEST_ADDRESS2",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // type Input = inferProcedureInput<AppRouter["profile"]["profileById"]>;
    // const input: Input = {};

    const result = await caller.profile.profileById();

    expect(result).toStrictEqual({
      profile: {
        id: "TEST_PROFILE_ID",
        userId: "TEST_USER_ID",
        address1: "TEST_ADDRESS1",
        address2: "TEST_ADDRESS2",
        name: "TEST_FULLNAME",
        city: "TEST_CITY",
        state: "TX",
        zipcode: "12345",
        address: ["TEST_ADDRESS1", "TEST_ADDRESS2"].join(" "),
        createdAt: result.profile?.createdAt,
        updatedAt: result.profile?.updatedAt,
      },
    });
  });

  //   test("[PROFILE API]: profileById", async () => {
  //     const req = {} as IncomingMessage; // fake request object
  //     const res = {} as ServerResponse; // fake request object
  //     await prisma.user.delete({
  //       where: {
  //         username: "TEST_USERNAME",
  //       },
  //     });

  //     const user1 = await prisma.user.upsert({
  //       where: {
  //         username: "TEST_USERNAME",
  //       },
  //       update: {},
  //       create: {
  //         id: "TEST_USER_ID",
  //         username: "TEST_USERNAME",
  //         password: "TEST_PASSWORD",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     });
  //     console.log(user1);
  //     const mockSession: ServerSession = {
  //       expires: new Date(),
  //       id: user1.id,
  //       sessionToken: "TEST_SESSION_TOKEN",
  //       User: user1,
  //     };

  //     const prismaMock = mockDeep<PrismaClient>();

  //     const ctx = createInnerTRPCContext({
  //       session: mockSession,
  //       req: req,
  //       res: res,
  //       prisma: prismaMock,
  //     });

  //     const caller = appRouter.createCaller(ctx);

  //     // type Input = inferProcedureInput<AppRouter["profile"]["profileById"]>;
  //     // const input: Input = {};

  //     const result = await caller.profile.profileById();

  //     expect(result).toStrictEqual({
  //       status: "sucess",
  //       profile: {
  //         address1: "TEST_ADDRESS1",
  //         address2: "TEST_ADDRESS2",
  //         name: "TEST_FULLNAME",
  //         city: "TEST_CITY",
  //         state: "AK",
  //         zipcode: "12345",
  //         user: { connect: { id: mockSession.User.id } },
  //         address: ["TEST_ADDRESS1", "TEST_ADDRESS2"].join(" "),
  //       },
  //     });
  //   });
});
