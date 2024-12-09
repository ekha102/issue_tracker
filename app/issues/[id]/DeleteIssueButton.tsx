"use client";
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import DailogDeleteErrorMessage from './DailogDeleteErrorMessage';
import Spinner from '@/app/components/spinner';



const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  // console.log("issueID: ", issueId);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const HandleDelete = async (issueId: number) => {
    // console.log("Testing ID: ", issueId);
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
    } catch (error) {
      setIsDeleting(false);
      setErrorMessage(true);
    }

  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>Delete Issue {isDeleting ? <Spinner/> : false}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Conformation to delete</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Do you want to delete this issue?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={() => HandleDelete(issueId)}>
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {errorMessage ? <DailogDeleteErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> : false}
    </>


  )
}

export default DeleteIssueButton