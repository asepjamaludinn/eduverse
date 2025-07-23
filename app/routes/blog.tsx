import type { Route } from './+types/blog'
import { BlogTable } from '@/components/common/blog/blog-table'
import { blogData } from '@/data/blog-data'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blog - Eduverse Dashboard' },
    { name: 'description', content: 'Manage blog posts and articles' },
  ]
}

export default function Blog() {
  return (
    <div className="flex flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts, articles, and content publishing workflow.
          </p>
        </div>
      </div>
      <BlogTable data={blogData} />
    </div>
  )
}
