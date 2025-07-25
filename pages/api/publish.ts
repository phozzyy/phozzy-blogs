import { supabase } from '../../lib/supabase'

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content } = req.body;
    const { data, error } = await supabase.from('posts').insert([{ title, content }]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ success: true });
}