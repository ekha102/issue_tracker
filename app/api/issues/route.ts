import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";



export async function POST(request: NextRequest) {
  const body = await request.json();
  // console.log(body);
  const validation = issueSchema.safeParse(body);
  // console.log("Val: ", validation);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  
  const newIssue = await prisma.issue.create({
    data: { 
      issue_title: body.issue_title, 
      issue_desc: body.issue_desc }
  });

  return NextResponse.json(newIssue, { status: 201 });
}