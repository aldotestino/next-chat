'use client';

import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { sendMessage } from '@/server/actions';

const messageSchema = z.object({
  content: z.string().min(1)
});

type MessageSchema = z.infer<typeof messageSchema>;

function MessageInput({ chatType, chatId }: {chatType: string, chatId: string}) {

  const { execute, status } = useAction(sendMessage);

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });
 
  function onSubmit(values: MessageSchema) {
    execute({ chatId: parseInt(chatId), content: values.content });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-4 p-4">
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
        <Button type="submit" className="space-x-2">
          <span>Send</span>
          <Send className="w-6 h-6" />
        </Button>
      </form>
    </Form>
  );
}

export default MessageInput;