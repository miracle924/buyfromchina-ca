'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export type OrderUpdateState = {
  success?: boolean;
  error?: string;
};

const schema = z.object({
  orderId: z.string().min(1),
  status: z.nativeEnum(OrderStatus)
});

export async function updateOrderStatus(_prev: OrderUpdateState, formData: FormData): Promise<OrderUpdateState> {
  const session = await auth();
  if (!session?.user) {
    redirect('/admin/login');
  }

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: 'Invalid data submitted.' };
  }

  const { orderId, status } = parsed.data;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { quote: true }
  });

  if (!order) {
    return { error: 'Order not found.' };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  if (status === OrderStatus.PAID && order.quote.status !== 'PAID') {
    await prisma.quote.update({
      where: { id: order.quoteId },
      data: { status: 'PAID' }
    });
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/admin/quotes/${order.quoteId}`);

  return { success: true };
}
