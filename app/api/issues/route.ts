import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  issue_title: z.string().min(1).max(255),
  issue_desc: z.string().min(1)
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = createIssueSchema.safeParse(body);
  console.log("Val: ", validation);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  
  const newIssue = await prisma.issue.create({
    data: { issue_title: body.issue_title, issue_desc: body.issue_desc }
  });

  return NextResponse.json(newIssue, { status: 201 });
}