'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const messageSchema = z.object({
  content: z.string().min(1)
});

type MessageSchema = z.infer<typeof messageSchema>;

function MessageInput({ chatType, chatId }: {chatType: string, chatId: number}) {

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });
 
  function onSubmit(values: MessageSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-2 p-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Write a message" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <Send />
        </Button>
      </form>
    </Form>
  );
}

export default MessageInput;