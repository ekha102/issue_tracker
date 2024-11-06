"use client";
// Stop at 9-Handle Form submission 
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";



interface IssueForm {
  issue_title: string;
  issue_desc: string;
};


export default function NewIssue() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  console.log(register("issue_title"));



  const onSubmit = async (values: IssueForm) => {
    console.log(values)
    await axios.post("/api/issues", values);
    router.push("/issues");
  }


  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Title" {...register("issue_title")} />
      <Controller 
        name="issue_desc"
        control={control}
        render={({field }) => {
          return (<SimpleMDE placeholder="Description" {...field} />)
        }}
      />
      
      <Button>Submit New Issue</Button>
    </form>
  );
}