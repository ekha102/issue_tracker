"use client";
import { AlertDialog, Button } from '@radix-ui/themes'
import React from 'react'



const DailogDeleteErrorMessage = ({errorMessage, setErrorMessage}) => {
  return (
    <AlertDialog.Root open={errorMessage}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
        <Button color="gray" onClick={()=>setErrorMessage(false)}>OK</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DailogDeleteErrorMessage