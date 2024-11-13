"use client";
// Stop at 9-Handle Form submission 
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/spinner";




type IssueForm = z.infer<typeof createIssueSchema>;


export default function NewIssue() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setIssubmitting] = useState(false);
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  // console.log(register("issue_title"));



  const onSubmit = async (values: IssueForm) => {
    try {
      setIssubmitting(true);
      await axios.post("/api/issues", values);
      router.push("/issues");
    } catch (error) {
      setIssubmitting(false);
      setError("An unexpected error occured.");
    }
  }


  return (
    <div className="max-w-xl mb-2">
      {error && (
        <Callout.Root color="red">
          {error}
        </Callout.Root>
      )}
      
      <form className=" space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("issue_title")} />
        {errors.issue_title && <Text color="red" as="p">{errors.issue_title.message}</Text>}
        
        <Controller 
          name="issue_desc"
          control={control}
          render={({field }) => {
            return (<SimpleMDE placeholder="Description" {...field} />)
          }}
        />
        {errors.issue_desc && <Text color="red" as="p">{errors.issue_desc.message}</Text>}
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>} </Button>
      </form>

    </div>
    
  );
}