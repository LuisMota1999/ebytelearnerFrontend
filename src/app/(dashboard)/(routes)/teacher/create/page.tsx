"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import PdfRenderer from "@/components/PdfRenderer";
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().max(250, {
    message: "Description can not be above 250 characters.",
  }),
  price: z
    .preprocess((val) => {
      if (typeof val === "string") return parseFloat(val);
      return val;
    }, z.number())
    .refine((val) => val > 0, {
      message: "Price must be a non-negative number.",
    }),
});

const CreatePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Enable auto conversion to numbers
    defaultValues: {
      title: "",
      description: "",
      price: 0, // Adjusted default value to number
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/course", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        {/* Left sidebar & main wrapper */}
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            {/* Main area */}
            <PdfRenderer url={""} />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          
        </div>
      </div>
    </div>
  
    // <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
    //   <div>
    //     <h1 className="text-2xl">Name your Course</h1>
    //     <p className="text-sm text-slate-600">
    //       What would you like to name your course? Don&apos;t worry, you can
    //       change this later.
    //     </p>
    //     <Form {...form}>
    //       <form
    //         onSubmit={form.handleSubmit(onSubmit)}
    //         className="space-y-8 mt-8"
    //       >
    //         <FormField
    //           control={form.control}
    //           name="title"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Title</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   disabled={isSubmitting}
    //                   placeholder="e.g 'Advanced Web Development'"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormDescription>
    //                 What will you teach in this course?
    //               </FormDescription>
    //               <FormMessage>
    //                 {form.formState.errors.title?.message}
    //               </FormMessage>{" "}
    //               {/* Display validation error message */}
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="description"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Description</FormLabel>
    //               <FormControl>
    //                 <Textarea
    //                   disabled={isSubmitting}
    //                   placeholder="e.g 'This course you will learn the concepts of JS!'"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormDescription>
    //                 What subjects will you teach in this course?
    //               </FormDescription>
    //               <FormMessage>
    //                 {form.formState.errors.description?.message}
    //               </FormMessage>{" "}
    //               {/* Display validation error message */}
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="price"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Price</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   type="number"
    //                   inputMode="decimal"
    //                   step="0.01"
    //                   pattern="\d*\.?\d*"
    //                   disabled={isSubmitting}
    //                   placeholder="e.g 10.99€"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormDescription>What price is this course?</FormDescription>
    //               <FormMessage>
    //                 {form.formState.errors.price?.message}
    //               </FormMessage>{" "}
    //               {/* Display validation error message */}
    //             </FormItem>
    //           )}
    //         />
    //         <div className="flex items-center gap-x-2">
    //           <Link href="/">
    //             <Button variant="ghost" type="button">
    //               Cancel
    //             </Button>
    //           </Link>
    //           <Button type="submit" disabled={!isValid || isSubmitting}>
    //             Continue
    //           </Button>
    //         </div>
    //       </form>
    //     </Form>
    //   </div>
    // </div>
  );
};

export default CreatePage;
