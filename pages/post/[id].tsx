import { supabase } from '../../lib/supabase'

type Post = {
    id: string | number;
    title: string;
    content: string;
    [key: string]: any;
};

interface PostPageProps {
    post: Post | null;
}

export default function PostPage({ post }: PostPageProps) {
    if (!post) {
        return <div className="p-6 text-center text-red-600">Post Not Found</div>
    }

    return ( 
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </div>
    )
}

import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params?.id)
        .single()

    return {
        props: {
            post: post || null,
        }
    }
}