import { NextApiRequest, NextApiResponse } from 'next'


export default function users(request: NextApiRequest, response: NextApiResponse) {
    const idUser = request.query?.id
    const users = [
        {
            id: 1,
            name: "Victor"
        },
        {
            id: 2,
            name: "teste"
        }
    ]

    return response.json(users)
}