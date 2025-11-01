'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma, QuoteStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export type QuoteUpdateState = {
  success?: boolean;
  error?: string;
};

const numberField = z
  .string()
  .transform((value) => Number(value))
  .refine((value) => Number.isFinite(value) && value >= 0, 'Must be a valid non-negative number.');

const updateSchema = z.object({
  itemCostCad: numberField,
  serviceFeeCad: numberField,
  shippingCad: numberField,
  taxCad: numberField,
  totalCad: numberField,
  status: z.nativeEnum(QuoteStatus)
});

export async function updateQuote(_prev: QuoteUpdateState, formData: FormData): Promise<QuoteUpdateState> {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/admin/login');
  }

  const id = formData.get('quoteId');
  if (typeof id !== 'string' || !id) {
    return { error: 'Missing quote ID.' };
  }

  const parsed = updateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Invalid data.';
    return { error: message };
  }

  const quote = await prisma.quote.findUnique({ where: { id } });
  if (!quote) {
    return { error: 'Quote not found.' };
  }

  const data = parsed.data;
  const updates = {
    itemCostCad: new Prisma.Decimal(data.itemCostCad),
    serviceFeeCad: new Prisma.Decimal(data.serviceFeeCad),
    shippingCad: new Prisma.Decimal(data.shippingCad),
    taxCad: new Prisma.Decimal(data.taxCad),
    totalCad: new Prisma.Decimal(data.totalCad),
    status: data.status
  };

  const changes: Record<string, { before: string; after: string }> = {};
  (Object.keys(updates) as Array<keyof typeof updates>).forEach((key) => {
    const previous = quote[key];
    const next = updates[key];
    const prevValue = previous instanceof Prisma.Decimal ? previous.toNumber() : previous;
    const nextValue = next instanceof Prisma.Decimal ? next.toNumber() : next;
    if (prevValue !== nextValue) {
      changes[key] = {
        before: String(prevValue),
        after: String(nextValue)
      };
    }
  });

  await prisma.quote.update({
    where: { id },
    data: updates
  });

  if (Object.keys(changes).length > 0) {
    await prisma.quoteAudit.create({
      data: {
        quoteId: id,
        actorEmail: session.user.email ?? 'admin',
        changes
      }
    });
  }

  revalidatePath(`/admin/quotes/${id}`);
  revalidatePath('/admin/quotes');

  return { success: true };
}
