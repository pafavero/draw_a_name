import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'OPTIONS') {
    res.status(200);
  } else if (req.method === 'GET') {
    console.log('Method get is not useful');
    res.status(200).json({message: 'Method get is not useful'});
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('method post:', body);
    (async () => {
      const path: string = '/tmp/results.json';
      fs.closeSync(fs.openSync(path, 'w'));
      await fs.promises.writeFile(path, JSON.stringify(body), 'utf8');
    })();
    res.status(200).json({ message: 'ok' });
  }
}  
