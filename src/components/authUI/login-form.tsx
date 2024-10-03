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
import { LoginSchema } from "@/schemas";



export default function LoginForm() {

  // const searchParams = useSearchParams();
  // const urlError =
  // searchParams.get("error") === "OAuthAccountNotLinked"
  // 	? "Email already used with different account!"
  // : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    setTransition(() => {
      //data send to server
      console.log(data);
    });
  };
  // "bg-background rounded-full pl-4 text-base border-border text-textGray"
  return (
    <>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-[20rem] md:w-[30rem] flex justify-center flex-col gap-y-6">
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
											className="bg-background rounded-full pl-6 h-12  text-base border-border text-textGray"
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
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
