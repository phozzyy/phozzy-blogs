import { supabase } from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'


type Post = {
  id: string
  title: string
  content: string
}

type HomeProps = {
  posts: Post[]
}
export async function getStaticProps() {
  const { data: posts } = await supabase.from('posts').select('*')
  return {
    props: {
      posts: posts || [],
    },
  }
}

export default function Home({ posts }: HomeProps) {
  return (
    <main className="p-6 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl mx-auto border border-red-500"></div>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Phozzy&apos;s Blog!</h1>
        {posts.length === 0 ? (
          <p className="text-gray-700 text-center">
            No posts yet — but soon Phoebe and Ozzy will tell you all you need to know! 🐾✨
          </p>
        ) : null}
      </div>
      {posts.length > 0 && (
        <div className="w-full max-w-7xl mx-auto mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
          <div className="bg-blue-500 text-white p-4">Tailwind Test</div>
        </div>
        
      )}
    </main>
  )
}