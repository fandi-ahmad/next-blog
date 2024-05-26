"use client"
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { GetArticle } from "@/lib/supabase/GetArticle";
import { DateFormat } from "@/utils/DateFormat";

type dataArticles = {
  id: number,
  id_user: number,
  body_post: string,
  head_post: string,
  label: string,
  thumbnail: any,
  created_at: string
}

export default function Home() {
  const [articleList, setArticleList] = useState<dataArticles[]>([])
  
  const getAllArticle = async () => {
    const response = await GetArticle()
    if (response.data) {
      setArticleList(response.data);
    }
  }

  useEffect(() => {
    getAllArticle()
  }, [])

  return (
    <main>
      <div className="mt-4">
        {articleList.map((article) => (
          <Card
            key={article.id}
            head={article.head_post}
            body={article.body_post}
            created_at={DateFormat(article.created_at)}
            label={article.label}
            src={article.thumbnail}
          />
        ))}
      </div>
    </main>
  );
}
