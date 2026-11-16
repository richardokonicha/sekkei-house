export type Bookmark = {
  id: string
  created_at: string
  full_name: string
  email: string
  twitter_handle: string
  product_website: string
  codename: string
  punchline: string
  description: string
  logo_src: string | null
  user_id: string
  tags: string[] | null
  view_count: number
  approved: boolean
  featured?: boolean
  labels: string[] | null
  categories: string | null
  component_path?: string | null
  github_url?: string | null
}
