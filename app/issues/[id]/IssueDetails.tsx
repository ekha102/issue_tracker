import IssueStatusBadge from '@/app/components/issuesStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ( {issue}:{issue: Issue} ) => {
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
  )
}

export default IssueDetails