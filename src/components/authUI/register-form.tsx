"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { ExclamationMark } from "../ui/exclamation-mark";
import { RegisterSchema } from "@/schemas";
import { register } from "@/action/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function RegisterForm() {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();
	const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
		setSuccess("");

    setTransition(() => {
			//data send to server
			register(values)
				//data received from server
				.then((data) => {
					setError(data.error)
					setSuccess(data.success)
					toast.success("Account created successfully!")
					router.push("/auth/login")
				})
				.catch((error) => {
					setError(error)			
		})
		})
  };
  // "bg-background rounded-full pl-4 text-base border-border text-textGray"
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-[20rem] md:w-[25rem] xl:w-[30rem] flex justify-center flex-col gap-y-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-background rounded-full pl-6 h-12 text-base border-border text-textGray"
                      disabled={isPending}
                      placeholder="name"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-background rounded-full pl-6 h-12 text-base border-border text-textGray"
                      disabled={isPending}
                      type="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-background rounded-full pl-6 h-12 text-base border-border text-textGray"
                      disabled={isPending}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              disabled={isPending}
              className="w-full rounded-full h-12 text-base dark:hover:bg-neutral-400 mt-4"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
