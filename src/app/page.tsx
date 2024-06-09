"use client"
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { DateFormat } from "@/utils/DateFormat";
import { GetArticleWithUser } from "@/lib/supabase/GetArticleWithUser";
import LimitText from "@/utils/LimitText";

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
  const [articleList, setArticleList] = useState<dataArticles[]>([])
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!+ '/storage/v1/object/public/'

  const getAllArticleNested = async () => {
    const response: any = await GetArticleWithUser()
    setArticleList(response)
  }

  useEffect(() => {
    getAllArticleNested()
  }, [])

  return (
    <main>
      <div className="mt-10">
        {articleList.map((article) => (
          <Card
            key={article.id}
            head={article.head_post}
            body={LimitText(article.body_post)}
            created_at={DateFormat(article.created_at)}
            username={article.user.username}
            label={article.label}
          />
        ))}
      </div>
    </main>
  );
}
