import Link from 'next/link'

type ArticleCardProps = {
    post: {
        id: string | number;
        title: string;
        content: string;
    };
};

export default function ArticleCard({ post }: ArticleCardProps) {
    return (
        <div className="bg-white rounded shadow p-4 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 line-clamp-3">{post.content}</p>
            <Link href={`/post/${post.id}`}>
            <span className="text-blue-600 mt-2 inline-block hover:underline">Read more</span>
            </Link>
        </div>
    );
}