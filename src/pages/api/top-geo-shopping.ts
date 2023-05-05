// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getLocationWithMoreCarts from '@/api/location/getLocationWithMoreCarts';
import type { NextApiResponse, NextApiHandler } from 'next';

interface Data {
    location: any;
}

const handler: NextApiHandler = async (req, res: NextApiResponse<Data>) => {
    const location = await getLocationWithMoreCarts();
    res.status(200).json({ location });
};

export default handler;
