"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.string().min(1, "Login is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data); // Handle successful form submission here
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Form>
          <div className="w-full flex justify-center flex-col gap-y-4">
            <FormItem className="">
              <FormControl>
                <Input
                  className="bg-background rounded-full pl-4 text-base border-border text-textGray"
                  id="email"
                  {...methods.register("email")}
                  placeholder="email"
                />
              </FormControl>
              {methods.formState.errors.email && (
                <FormMessage>
                  {methods.formState.errors.email.message}
                </FormMessage>
              )}
            </FormItem>
            <FormItem>
              <FormControl>
                <Input
                  className="bg-background rounded-full pl-4 text-base border-border text-textGray"
                  id="password"
                  type="password"
                  {...methods.register("password")}
                  placeholder="password"
                />
              </FormControl>
              {methods.formState.errors.password && (
                <FormMessage>
                  {methods.formState.errors.password.message}
                </FormMessage>
              )}
            </FormItem>

            <Button className="w-full rounded-full text-base dark:hover:bg-neutral-400" type="submit">
              Log in
            </Button>
          </div>
        </Form>
      </form>
    </FormProvider>
  );
}
