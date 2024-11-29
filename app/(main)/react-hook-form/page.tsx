"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 3 characters" })
    .regex(/^u\d{3}$/, { message: "regex error" }),
  email: z.string().email({ message: "Invalid email" }),
  fruits: z.string().min(1, { message: "Fruits not be empty" }),
  items: z.array(z.string()).refine((items) => items.length > 0, { message: "Items must be selected" }),
});

export default function ReactHookFormPage() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      fruits: "",
      items: [],
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast({
      title: "Submitted",
      description: JSON.stringify(data, null, 2),
    });
  };

  const handleReset = () => {
    form.reset();
    form.clearErrors();
  };

  const handleFetch = () => {
    setTimeout(() => {
      form.reset({
        name: "u123",
        email: "123@123.com",
        fruits: "apple",
        items: ["home", "applications"],
      });
    }, 2000);
  };

  return (
    <div>
      <Separator className="my-6" />
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-96 mx-auto">
          <Button type="button" variant="outline" onClick={() => handleFetch()}>
            fetch
          </Button>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Name<FormDescription>{form.formState.errors.name?.message}</FormDescription>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            name={"fruits"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fruits</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(field.value?.filter((value) => value !== item.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button type="submit" variant="outline">
              Submit
            </Button>
            <Button type="reset" variant="outline" onClick={() => handleReset()}>
              reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
