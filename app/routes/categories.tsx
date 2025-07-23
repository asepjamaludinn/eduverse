import type { Route } from './+types/categories'
import { CategoriesTable } from '@/components/common/categories/categories-table'
import { categoriesData } from '@/data/categories-data'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Categories - Eduverse Dashboard' },
    { name: 'description', content: 'Manage course categories' },
  ]
}

export default function Categories() {
  return (
    <div className="flex flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage course categories and organize content.
          </p>
        </div>
      </div>
      <CategoriesTable data={categoriesData} />
    </div>
  )
}
