import { type AppRouter } from "../api/root";
import { TRPCError, type inferProcedureInput } from "@trpc/server";
import { createTestContext } from "./testingConfig";
import { hash } from "argon2";

describe("AUTH API SIGNUP PROC", () => {
  test("[AUTH API]: signup", async () => {
    const { caller, prismaMock } = createTestContext({
      session: null,
    });

    prismaMock.user.create.mockResolvedValue({
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["auth"]["signUp"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    const result = await caller.auth.signUp(input);

    expect(result).toStrictEqual({
      status: "success",
      message: "User created",
      result: input.username,
    });
  });

  it("signup should fail if a user with the same username already exists", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    prismaMock.user.findUnique.mockResolvedValue({
      id: "TEST_USER_ID",
      username: "TEST_USERNAMEeee",
      password: "TEST_PASSWORD",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["auth"]["signUp"]>;
    const input: Input = {
      username: "TEST_USERNAMEeee",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.signUp(input)).rejects.toThrowError(
      new TRPCError({
        code: "FORBIDDEN",
        message: "Username already in use",
      })
    );
  });

  it("signup should fail if the prisma client throws an error", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    prismaMock.user.create.mockRejectedValue(null);

    type Input = inferProcedureInput<AppRouter["auth"]["signUp"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.signUp(input)).rejects.toThrowError(
      new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "INTERNAL_SERVER_ERROR",
      })
    );
  });
  it("signup should fail if the prisma client throws an error v2", async () => {
    const { caller } = createTestContext({
      session: null,
    });

    type Input = inferProcedureInput<AppRouter["auth"]["signUp"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.signUp(input)).rejects.toThrowError(
      new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      })
    );
  });
});

describe("AUTH API LOGIN PROC", () => {
  it("login should fail if the user does not exist", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    prismaMock.user.findUnique.mockResolvedValue(null);

    type Input = inferProcedureInput<AppRouter["auth"]["login"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.login(input)).rejects.toThrowError(
      new TRPCError({
        code: "UNAUTHORIZED",
        message: "User Not Found",
      })
    );
  });

  it("login should fail if the password is incorrect", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    const hashedPassword = await hash("TEST_PASSWORD");
    prismaMock.user.findUnique.mockResolvedValue({
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["auth"]["login"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD_WRONG",
    };

    await expect(caller.auth.login(input)).rejects.toThrowError(
      new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      })
    );
  });

  it("login should fail if the prisma client throws an error", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    prismaMock.user.findUnique.mockRejectedValue(null);

    type Input = inferProcedureInput<AppRouter["auth"]["login"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.login(input)).rejects.toThrowError(
      new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "INTERNAL_SERVER_ERROR",
      })
    );
  });

  it("login should succeed if the user exists and the password is correct", async () => {
    const { prismaMock, caller } = createTestContext({
      session: null,
    });

    const hashedPassword = await hash("TEST_PASSWORD");

    prismaMock.user.findUnique.mockResolvedValue({
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.session.create.mockResolvedValue({
      id: "TEST_SESSION_ID",
      sessionToken: "TEST_SESSION_ID",
      userId: "TEST_USER_ID",
      expires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["auth"]["login"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    const result = await caller.auth.login(input);

    expect(result).toStrictEqual({
      status: "success",
      message: "User logged in",
    });
  });

  it("should fail if no session is created db error", async () => {
    const { caller, prismaMock } = createTestContext({
      session: null,
    });

    const hashedPassword = await hash("TEST_PASSWORD");

    prismaMock.user.findUnique.mockResolvedValue({
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["auth"]["login"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    await expect(caller.auth.login(input)).rejects.toThrowError(
      new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      })
    );
  });
});

describe("AUTH GET SESSION PROC", () => {
  it("getSession should fail if the user is not logged in", async () => {
    const { caller } = createTestContext({
      session: null,
    });

    const result = await caller.auth.getSession();

    expect(result).toBe(null);
  });

  it("getSession should succeed if the user is logged in", async () => {
    const { caller, sessionExpires } = createTestContext({
      session: true,
    });

    const result = await caller.auth.getSession();
    // might fail because of date comparison??
    expect(result).toStrictEqual({
      User: {
        id: "TEST_USER_ID",
        username: "TEST_USERNAME",
        profileComplete: true,
      },
      expires: sessionExpires,
      id: "TEST_USER_ID",
      sessionToken: "TEST_SESSION_TOKEN",
    });
  });
});

describe("AUTH LOGOUT PROC", () => {
  it("logout should succeed if the user is logged in", async () => {
    const { caller } = createTestContext({
      session: true,
    });

    const result = await caller.auth.logout();

    expect(result).toStrictEqual({
      status: "success",
    });
  });
});

describe("AUTH GET PROFILE PROC", () => {
  it("getProfile should succed", async () => {
    const { caller, prismaMock } = createTestContext({
      session: true,
    });
    const fakeDate = new Date();

    prismaMock.profile.findUnique.mockResolvedValue({
      id: "TEST_PROFILE_ID",
      userId: "TEST_USER_ID",
      address1: "TEST_ADDRESS",
      address2: "TEST_ADDRESS2",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "TEST_ZIPCODE",

      address: "TEST_ADDRESS, TEST_ADDRESS2, TEST_CITY, TX, TEST_ZIPCODE",
      name: "TEST_NAME",
      createdAt: fakeDate,
      updatedAt: fakeDate,
    });

    const result = await caller.auth.profileComplete();

    expect(result).toStrictEqual({
      status: "success",
      message: "Profile found",
      profile: true,
    });
  });

  it("getProfile should fail if no profile is found", async () => {
    const { caller } = createTestContext({
      session: true,
    });

    const result = await caller.auth.profileComplete();

    expect(result).toStrictEqual({
      status: "error",
      message: "Profile not found",
      profile: false,
    });
  });
});
