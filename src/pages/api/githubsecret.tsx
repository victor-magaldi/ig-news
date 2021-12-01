import { NextApiRequest, NextApiResponse } from "next";

export default function users(
  request: NextApiRequest,
  response: NextApiResponse
) {
  return response.json({
    ping: true,
  });
}
