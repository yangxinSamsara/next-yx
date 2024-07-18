"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Invalid 邮箱" }),
  password: z.string().min(8, { message: "密码至少8位" }),
});

export default function ReactHookFormPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "aaa@qq.com",
      password: "admin123456",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    toast({
      title: "data",
      description: JSON.stringify(data),
    });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl font-bold">Login Form</h2>
        <Separator className="my-6" />
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto">
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="flex items-center space-x-4 py-6 w-full">
          <Separator className="flex-1" />
          <span className="flex-none">Or</span>
          <Separator className="flex-1" />
        </div>
      </div>
    </div>
  );
}
