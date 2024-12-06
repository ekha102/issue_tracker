

import IssueStatusBadge from "@/app/components/issuesStatusBadge";
import prisma from '@/prisma/client';
import Link from "next/link";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons"
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";




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
        <IssueDetails issue={issue}/>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.issue_id} />
          <DeleteIssueButton issueId={issue.issue_id} />
        </Flex>
      </Box>
    </Grid>
  );
}