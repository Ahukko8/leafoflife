// lib/init-middleware.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result: any) =>
        result instanceof Error ? reject(result) : resolve()
      );
    });
}

  