"use client"
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from "@mui/material";
import Card from "@/components/Card";
import { DateFormat } from "@/utils/DateFormat";
import { useGlobalState } from "@/lib/state";
import Link from "next/link";
import LimitText from "@/utils/LimitText";
import { useRouter } from "next/navigation";

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
  const componentClient = createClientComponentClient()
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

  const getUserFromCurrentUserLogin = async (email?: string) => {
    const {data: users} = await supabase
      .from('users').select('*')
      .eq('email', email).maybeSingle()

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
    getUserFromCurrentUserLogin(user?.email)
    user?.email ? setUserEmail(user?.email) : null
    user?.id ? setUserIdAuth(user.id) : null
  }


  const createNewUserFromCurrentUserLogin = async () => {
    await supabase
      .from('users')
      .upsert({ email: userEmail, id_auth: userIdAuth })
      .select()

    getCurrentUserLogin()
  }


  useEffect(() => {
    if (isDataReady && !userList) {
      createNewUserFromCurrentUserLogin()
    }
  }, [userList, isDataReady])


  useEffect(() => {
    setIsShowLoading(true)
    getCurrentUserLogin()
  }, [])


  const getArticleByUser = async () => {
    const {data: articles} = await supabase.from('articles').select('*').eq('id_user', userId)
    articles ? setArticleList(articles) : null
  }

  useEffect(() => {
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

    getCurrentUserLogin()
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
        <Tooltip title='Edit profile' arrow onClick={openEditProfile}>
          <Edit fontSize="small" className="cursor-pointer text-gray-400 hover:text-gray-500" />
        </Tooltip>
      </div>

      <hr className="mt-8" />

      <div className="mt-8 flex justify-end">
        <Link href={`/${usernameLogin}/new-article`}>
          <Button className="capitalize" variant="outlined">Create New Article</Button>
        </Link>
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
            onClickEdit={() => router.push(`/${usernameLogin}/edit-article/${article.id}`)}
            onClickDelete={() => handleClickDelete(article.id)}
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