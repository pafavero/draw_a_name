import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // res.status(200).json({ message: 'Hello from Next.js!' });
  // console.log('###############################################################', req);
  // await runMiddleware(req, res, cors);
  if (req.method === 'OPTIONS') {
    res.status(200);
  } else if (req.method === 'GET') {
    console.log('Method get is not useful');
    res.status(200).json({message: 'Method get is not useful'});
  } else if (req.method === 'POST') {
    const body = req.body;
    // console.log('method post:', body);
    (async () => {
      await fs.writeFile(process.cwd() + '/public/results.json', JSON.stringify(body), 'utf8');
    })();
    res.status(200).json({ message: 'ok' });
  }
}  
