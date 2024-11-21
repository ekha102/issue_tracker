
import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/issuesStatusBadge";
import delay from "delay";



export default async function IssuesPage () {

  const issues = await prisma.issue.findMany()
  await delay(2000);


  return (
    <div>
      <Button><Link href="/issues/new">New Issue</Link></Button>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((ele) => {
            return (
              <Table.Row key={ele.issue_id}>
                <Table.Cell>
                  <Link className="text-violet-600 hover:underline" href={`/issues/${ele.issue_id}`}>
                    {ele.issue_title}
                  </Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={ele.issue_status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={ele.issue_status}/></Table.Cell>
                <Table.Cell className="hidden md:table-cell">{ele.issue_created.toDateString()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}