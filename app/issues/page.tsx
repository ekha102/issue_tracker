
import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";



export default async function IssuesPage () {

  const issues = await prisma.issue.findMany()


  return (
    <div>
      <Button><Link href="/issues/new">New Issue</Link></Button>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((ele) => {
            return (
              <Table.Row key={ele.issue_id}>
                <Table.Cell>{ele.issue_title}</Table.Cell>
                <Table.Cell>{ele.issue_status}</Table.Cell>
                <Table.Cell>{ele.issue_created.toDateString()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}