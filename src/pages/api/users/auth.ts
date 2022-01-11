import { NextApiRequest, NextApiResponse } from 'next';

export default function getUserById (
  request: NextApiRequest, 
  response: NextApiResponse
) {
  const { id } = request.query;


  const users = [
    { id: 1, name: 'Gus' },
    { id: 2, name: 'Cath' },
    { id: 3, name: 'Salve' },
  ]

  response.json(users)
}