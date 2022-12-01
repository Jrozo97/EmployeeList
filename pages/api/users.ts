// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import info from '../../data/data.json';
import { DataUser } from '../../interface/dataUser.interface';



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataUser[]>
) {
  res.status(200).json(info)
}
