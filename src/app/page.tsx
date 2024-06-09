"use client"
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { DateFormat } from "@/utils/DateFormat";
import { GetArticleWithUser } from "@/lib/supabase/GetArticleWithUser";
import LimitText from "@/utils/LimitText";
import { Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

type dataArticles = {
  id: number,
  id_user: number,
  body_post: string,
  head_post: string,
  label: string,
  created_at: string,
  user: {
    id: number,
    username: string,
  }
}

export default function Home() {
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!+ '/storage/v1/object/public/'
  const [articleList, setArticleList] = useState<dataArticles[]>([])
  const [articleListView, setArticleListView] = useState<dataArticles[]>([])

  const getAllArticleNested = async () => {
    const response: any = await GetArticleWithUser()
    setArticleList(response)
    setArticleListView(response)
  }

  const searchArticle = (value: string) => {
    const filteredArticles = articleList.filter(article => 
      article.head_post.toLowerCase().includes(value.toLowerCase()) || 
      article.body_post.toLowerCase().includes(value.toLowerCase())
    );

    setArticleListView(filteredArticles)
  }

  useEffect(() => {
    getAllArticleNested()
  }, [])

  return (
    <main>
      <div className="mt-10">

        <div className="flex justify-center">
          <div className="flex items-center flex-row">
            <Box className='mb-6 mr-6 w-72' sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                className="w-full mt-4"
                placeholder="Search article"
                type="search"
                variant="standard"
                onChange={(e) => searchArticle(e.target.value)}
              />
            </Box>
          </div>
        </div>

        {articleListView.map((article) => (
          <Card
            key={article.id}
            head={article.head_post}
            body={LimitText(article.body_post)}
            created_at={DateFormat(article.created_at)}
            username={article.user.username}
            label={article.label}
            idForHref={article.id}
          />
        ))}
      </div>
    </main>
  );
}
