import { NextApiRequest, NextApiResponse } from "next";

export default function users(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  });
  return response.json({
    ping: true,
  });
}
