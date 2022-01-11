import { NextApiRequest, NextApiResponse } from 'next';

export default function getUsers (
  request: NextApiRequest, 
  response: NextApiResponse
) {
  const users = [
    { id: 1, name: 'Gus' },
    { id: 2, name: 'Cath' },
    { id: 3, name: 'Salve' },
  ]

  response.json(users)
}