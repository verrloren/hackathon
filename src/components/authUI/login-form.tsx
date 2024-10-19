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
// import { LoginButton } from "./login-button";
import {  useRouter, useSearchParams } from "next/navigation";
// import { login } from "@/action/login";
import toast from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";



export default function LoginForm() {

	const searchParams = useSearchParams();
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
	? "Email already used with different account!" 
	: "";
	const router = useRouter();
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

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
	
		setTransition(async () => {
			try {
				const result = await signIn("credentials", {
					email: values.email,
					password: values.password,
					redirect: false, // Disable automatic redirect for manual control
				});
	
				if (result?.error) {
					toast.error("Failed to log in!");
					setError(result.error);
					form.reset();
				} else {
					setSuccess("Logged in successfully!");
					toast.success("Logged in successfully!");
	
					// Now manually fetch the session and redirect
					const session = await getSession();
					if (session) {
						router.push("/"); // Redirect to main page after session is fetched
					}
				}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(`An error occurred: ${error}`);
			}
		});
	};
  // "bg-background rounded-full pl-4 text-base border-border text-textGray"
  return (
    <>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-[20rem] md:w-[25rem] xl:w-[30rem]  flex justify-center flex-col gap-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
											className="bg-background transition-colors rounded-full pl-6 h-12 text-base border-border text-textGray"
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
											className="bg-background transition-colors rounded-full pl-6 h-12  text-base border-border text-textGray"
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

						<FormError message={error || urlError} />
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
