export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"], // this will be used to match the routes that need authentication
};
