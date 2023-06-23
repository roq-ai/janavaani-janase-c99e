import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { janaSenaValidationSchema } from 'validationSchema/jana-senas';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.jana_sena
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getJanaSenaById();
    case 'PUT':
      return updateJanaSenaById();
    case 'DELETE':
      return deleteJanaSenaById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getJanaSenaById() {
    const data = await prisma.jana_sena.findFirst(convertQueryToPrismaUtil(req.query, 'jana_sena'));
    return res.status(200).json(data);
  }

  async function updateJanaSenaById() {
    await janaSenaValidationSchema.validate(req.body);
    const data = await prisma.jana_sena.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteJanaSenaById() {
    const data = await prisma.jana_sena.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
