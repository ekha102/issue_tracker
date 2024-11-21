

import IssueStatusBadge from "@/app/components/issuesStatusBadge";
import prisma from '@/prisma/client';
import Link from "next/link";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons"




interface Props {
  params: { id: string }
}

export default async function IssueDetailPage ({params}: Props) {
  const issue = await prisma.issue.findUnique({
    where: { issue_id: parseInt(params.id) }
  });
  

  if (!issue)
    notFound();

  return (
    <Grid columns={{initial: "1", md: "2"}} gap="5">
      <Box>
        <Heading>{issue.issue_title}</Heading>
        <Flex className="gap-2 my-2">
          <IssueStatusBadge status={issue.issue_status} />
          <Text>{issue.issue_created.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue.issue_desc}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button><Pencil2Icon />
          <Link href={`/issues/${issue.issue_id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}