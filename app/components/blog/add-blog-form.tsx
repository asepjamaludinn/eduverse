'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { toast } from '@/hooks/use-toast'
import { addBlogSchema, type AddBlogFormValues } from '@/schemas/blog-schema'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AUTOSAVE_KEY = 'add-blog-form-draft'
const AUTOSAVE_DEBOUNCE_TIME = 1000

export function AddBlogForm() {
  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: '',
      content_text: '',
      status: 'draft',
      sub_category_id: 1,
      created_by: 1,
    },
  })

  const { handleSubmit, control, watch, reset, formState, getValues } = form
  const { isSubmitting, isDirty } = formState

  const [title, content_text] = watch(['title', 'content_text'])
  const [autosaveStatus, setAutosaveStatus] = useState<
    'idle' | 'saving' | 'saved'
  >('idle')
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const savedDraft = localStorage.getItem(AUTOSAVE_KEY)
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        reset(parsed)
        toast({
          title: 'Draft Loaded',
          description: 'Your previous draft has been restored.',
        })
      } catch (error) {
        console.error('Failed to parse saved draft:', error)
      }
    }
  }, [reset])

  useEffect(() => {
    if (!isDirty) return

    setAutosaveStatus('saving')

    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)
    }

    autosaveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(getValues()))
        setAutosaveStatus('saved')
        setTimeout(() => setAutosaveStatus('idle'), 2000)
      } catch (error) {
        console.error('Autosave error:', error)
        setAutosaveStatus('idle')
      }
    }, AUTOSAVE_DEBOUNCE_TIME)

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current)
    }
  }, [isDirty, getValues, title, content_text])

  // Submit handler
  const onSubmit = async (values: AddBlogFormValues) => {
    await new Promise((res) => setTimeout(res, 1500))
    toast({
      title: 'Blog Post Added!',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    reset()
    localStorage.removeItem(AUTOSAVE_KEY)
    setAutosaveStatus('idle')
  }

  const handleReset = () => {
    reset()
    localStorage.removeItem(AUTOSAVE_KEY)
    setAutosaveStatus('idle')
    toast({
      title: 'Form Reset',
      description: 'The form has been cleared.',
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto">
      <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
        <CardHeader className="relative">
          {autosaveStatus !== 'idle' && (
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 text-xs px-2 py-1 animate-in fade-in duration-300"
            >
              {autosaveStatus === 'saving' ? 'Autosaving...' : 'Draft Saved!'}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-none">
                  Basic Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Provide the main details for your blog post.
                </p>
                <Separator />
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be the main title of your blog post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="revision">Revision</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The current status of your blog post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-none">
                  Content Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Write the full content of your blog post.
                </p>
                <Separator />
                <FormField
                  control={control}
                  name="content_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your blog content here..."
                          className="min-h-[200px] max-h-[400px] resize-none overflow-y-auto"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The full content of your blog post. Aim for at least 50
                        characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-none">Metadata</h3>
                <p className="text-sm text-muted-foreground">
                  Additional information for categorization and authorship.
                </p>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="sub_category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Category ID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number.parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          The ID of the sub-category this blog belongs to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="created_by"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Created By (User ID)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number.parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          The ID of the user who created this blog post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Blog Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex-1 md:max-w-[40%] lg:max-w-[35%] transition-all duration-300 hover:shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>See how your blog post will look.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col flex-1">
          <div>
            <h4 className="text-lg font-semibold mb-2">Title:</h4>
            <p className="text-xl font-bold break-words">
              {title || 'Your Blog Title Here'}
            </p>
          </div>
          <Separator />
          <div className="flex flex-col flex-1 min-h-0">
            <h4 className="text-lg font-semibold mb-2">Content:</h4>
            <div className="overflow-y-auto overflow-x-hidden rounded-md border p-4 max-h-[960px]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground break-words">
                  {content_text ||
                    'Start typing your blog content to see a live preview here...'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
