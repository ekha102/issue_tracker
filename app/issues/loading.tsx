import { Skeleton, Table } from "@radix-ui/themes";


export default function LoadingIssuesPage () {
  const issues = [1, 2, 3, 4, 5];

  return (
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
          <Table.Row key={ele}>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
            <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table.Root>
  );
}