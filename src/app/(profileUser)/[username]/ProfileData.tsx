"use client"
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from "@mui/material";
import Card from "@/components/Card";
import { DateFormat } from "@/utils/DateFormat";
import { useGlobalState } from "@/lib/state";
import Link from "next/link";
import LimitText from "@/utils/LimitText";
import { useRouter, useParams } from "next/navigation";

type dataArticles = {
  id: number,
  id_user: number,
  body_post: string,
  head_post: string,
  label: string,
  created_at: string
}


export default function ProfileData() {
  const supabase = createClient();
  const router = useRouter()
  const [userList, setUserList] = useState<any>()
  const [isDataReady, setIsDataReady] = useState<boolean>(false)

  const [userEmail, setUserEmail] = useState<string>('')
  const [userIdAuth, setUserIdAuth] = useState<string>('')
  const [userId, setUserId] = useState<number>()
  const [username, setUsername] = useState<string>('')
  const [newUsername, setNewUsername] = useState<string>('')

  const [isDisabledSaveBtn, setIsDisabledSaveBtn] = useState<boolean>(true)
  const [textErrorAlert, setTextErrorAlert] = useGlobalState('textErrorAlert')
  const [displayErrorAlert, setDisplayErrorAlert] = useGlobalState('displayErrorAlert')
  const [isShowLoading, setIsShowLoading] = useGlobalState('isShowLoading')
  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')

  const [articleList, setArticleList] = useState<dataArticles[]>([])
  const [isUserLoginSame, setIsUserLoginSame] = useState<boolean>(false)

  const params = useParams()

  const getUserByUsernameInParam = async () => {
    const {data: users} = await supabase
    .from('users').select('*')
    .eq('username', params.username).maybeSingle()

    users ? setUserList(users) : null
    users.id ? setUserId(users.id) : null
    if (users.username) {
      setUsername(users.username) 
      setNewUsername(users.username)
    }
    setIsDataReady(true)
  }

  const getCurrentUserLogin = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      user?.email ? setUserEmail(user?.email) : null
      user?.id ? setUserIdAuth(user.id) : null
      
      const {data: users} = await supabase
      .from('users').select('*')
      .eq('email', user.email).maybeSingle()

      users ? setUserList(users) : null
      users.id ? setUserId(users.id) : null
      if (users.username == params.username) {
        setIsUserLoginSame(true)
        setUsername(users.username) 
        setNewUsername(users.username)
      } else {
        setIsUserLoginSame(false)
      }
    }
  }



  const getArticleByUser = async () => {
    const {data: articles} = await supabase.from('articles').select('*').eq('id_user', userId)
    articles ? setArticleList(articles) : null
  }

  useEffect(() => {
    setIsShowLoading(true)
    getCurrentUserLogin()
    getUserByUsernameInParam()
    if (isDataReady) {
      getArticleByUser()
      setIsShowLoading(false)
    }
  }, [isDataReady])

  // ==========================

  const [isOpenDialod, setIsOpenDialog] = useState<boolean>(false);

  const openEditProfile = () => {
    setIsOpenDialog(true);
    setNewUsername(username)
  };

  const closeEditProfile = () => {
    setIsOpenDialog(false);
  };


  useEffect(() => {
    if (newUsername === '' || newUsername === username) {
      setIsDisabledSaveBtn(true)
    } else {
      setIsDisabledSaveBtn(false)
    }
  }, [newUsername])


  const updateUserProfile = async () => {
    const { error } = await supabase
      .from('users')
      .update({ username: newUsername })
      .eq('id', userId)
      .select()

    if (error) {
      setTextErrorAlert('Ups something wrong!')
      setDisplayErrorAlert('fixed')
      setTimeout(() => {
        setDisplayErrorAlert('hidden')
      }, 3000)
    }

    router.push(`/${newUsername}`)
    closeEditProfile()
  }

  // ============ delete article =====================

  const [isOpenDialodDelete, setIsOpenDialogDelete] = useState<boolean>(false);
  const [idArticle, setIdArticle] = useState<number>()

  const handleClickDelete = (id: number) => {
    setIsOpenDialogDelete(true)
    setIdArticle(id)
  }

  const deleteArticle = async () => {
    await supabase
    .from('articles')
    .delete()
    .eq('id', idArticle)

    getArticleByUser()
    setIsOpenDialogDelete(false)
  }


  return (
    <>
      <div className="mt-10 flex flex-row items-center">
        <p className="text-3xl font-medium me-2">{username}</p>
        {
          isUserLoginSame ?
          <Tooltip title='Edit profile' arrow onClick={openEditProfile}>
            <Edit fontSize="small" className="cursor-pointer text-gray-400 hover:text-blue-200" />
          </Tooltip> : null
        }
      </div>

      <hr className="mt-8" />

      <div className="mt-8 flex justify-end">
        {
          isUserLoginSame ? 
          <Link href={`/${usernameLogin}/new-article`}>
            <Button className="capitalize border border-white hover:border-blue-200 text-white hover:text-blue-200" variant="outlined">Create New Article</Button>
          </Link> : null
        }
      </div>
      <div className="mt-6">
        {articleList.map((article) => (
          <Card
            key={article.id}
            head={article.head_post}
            body={LimitText(article.body_post)}
            created_at={DateFormat(article.created_at)}
            label={article.label}
            username={username}
            idForHref={article.id}
            onClickEdit={isUserLoginSame ? () => router.push(`/${usernameLogin}/edit-article/${article.id}`) : null}
            onClickDelete={isUserLoginSame ? () => handleClickDelete(article.id) : null}
          />
        ))}
      </div>

      <Dialog open={isOpenDialod} onClose={closeEditProfile}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Username*"
            variant="outlined"
            className="mt-4 w-96"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className="capitalize" onClick={closeEditProfile}>Cancel</Button>
          <Button className="capitalize" onClick={updateUserProfile} disabled={isDisabledSaveBtn}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isOpenDialodDelete} onClose={closeEditProfile}>
        <DialogTitle>Delete Article</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the selected articles? you can't recover it back.</p>
        </DialogContent>
        <DialogActions>
          <Button className="capitalize" onClick={() => setIsOpenDialogDelete(false)}>Cancel</Button>
          <Button className="capitalize" onClick={deleteArticle}>Yes, delete it</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}