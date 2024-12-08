
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";


interface Props {
  params: {id: string}
}

export async function PUT(request: NextRequest, {params}: Props) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issueId = await prisma.issue.findUnique({
    where: { issue_id: parseInt(params.id) }
  });
  
  if (!issueId) 
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { issue_id: issueId.issue_id},
    data: {
      issue_title: body.issue_title,
      issue_desc: body.issue_desc
    }
  });

  return NextResponse.json(updatedIssue);
}

// Delete function to API 
export async function DELETE(request: NextRequest, {params}: Props) {
  // await delay(2000);
  const issueId = await prisma.issue.findUnique({
    where: {issue_id : parseInt(params.id)}
  });

  if (!issueId) 
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  // console.log("Testing: ", issueId);
  await prisma.issue.delete({
    where: {issue_id: issueId.issue_id},
  })
  return NextResponse.json("");

}