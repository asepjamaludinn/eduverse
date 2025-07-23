export interface Blog {
  blog_id: number
  title: string
  content_text: string
  status: 'approved' | 'rejected' | 'revision' | 'draft'
  sub_category_id: number
  created_by: number
  created_at: string
  updated_at: string
}

export const subCategoriesData = [
  { id: 1, name: 'Frontend Frameworks', category_name: 'Web Development' },
  { id: 2, name: 'Backend Development', category_name: 'Web Development' },
  { id: 3, name: 'iOS Development', category_name: 'Mobile Development' },
  { id: 4, name: 'Android Development', category_name: 'Mobile Development' },
  { id: 5, name: 'Machine Learning', category_name: 'Data Science' },
  { id: 6, name: 'Data Analysis', category_name: 'Data Science' },
]

export const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' },
]

export const blogData: Blog[] = [
  {
    blog_id: 1,
    title: 'Getting Started with React Hooks',
    content_text:
      "React Hooks revolutionized the way we write React components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks to help you build better React applications.",
    status: 'approved',
    sub_category_id: 1,
    created_by: 1,
    created_at: '2024-01-15 10:30:00',
    updated_at: '2024-01-20 14:45:00',
  },
  {
    blog_id: 2,
    title: 'Building RESTful APIs with Node.js',
    content_text:
      "Learn how to create robust and scalable RESTful APIs using Node.js and Express. We'll cover routing, middleware, authentication, and best practices for API development.",
    status: 'draft',
    sub_category_id: 2,
    created_by: 2,
    created_at: '2024-01-18 09:15:00',
    updated_at: '2024-01-22 16:20:00',
  },
  {
    blog_id: 3,
    title: 'iOS App Development with SwiftUI',
    content_text:
      "SwiftUI makes iOS development more intuitive and powerful. This tutorial covers the fundamentals of building beautiful iOS apps with SwiftUI's declarative syntax.",
    status: 'revision',
    sub_category_id: 3,
    created_by: 3,
    created_at: '2024-01-12 11:00:00',
    updated_at: '2024-01-25 13:30:00',
  },
  {
    blog_id: 4,
    title: 'Android Development with Kotlin',
    content_text:
      'Kotlin has become the preferred language for Android development. Learn how to build modern Android applications using Kotlin and the latest Android development tools.',
    status: 'approved',
    sub_category_id: 4,
    created_by: 1,
    created_at: '2024-01-10 08:45:00',
    updated_at: '2024-01-16 12:10:00',
  },
  {
    blog_id: 5,
    title: 'Introduction to Machine Learning',
    content_text:
      'Machine learning is transforming industries worldwide. This beginner-friendly guide introduces key concepts, algorithms, and practical applications of machine learning.',
    status: 'rejected',
    sub_category_id: 5,
    created_by: 4,
    created_at: '2024-01-08 14:20:00',
    updated_at: '2024-01-22 10:15:00',
  },
  {
    blog_id: 6,
    title: 'Data Visualization with Python',
    content_text:
      'Effective data visualization is crucial for data analysis. Learn how to create compelling charts and graphs using Python libraries like Matplotlib and Seaborn.',
    status: 'approved',
    sub_category_id: 6,
    created_by: 2,
    created_at: '2024-01-05 16:30:00',
    updated_at: '2024-01-14 09:45:00',
  },
]
