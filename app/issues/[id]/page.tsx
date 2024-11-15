import IssueStatusBadge from "@/app/components/issuesStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";


interface Props {
  params: {id: string}
}


export default async function IssueDetailPage ({params}: Props) {
 
  const issue = await prisma.issue.findUnique({
    where: {issue_id: parseInt(params.id)}
  });


  if (!issue)
    notFound();

  return (
    <div>
      <Heading>{issue.issue_title}</Heading>
      <Flex className="gap-2 my-2">
        <IssueStatusBadge status={issue.issue_status} />
        <Text>{issue.issue_created.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue.issue_desc}</ReactMarkdown>
      </Card>
    </div>
  );
}