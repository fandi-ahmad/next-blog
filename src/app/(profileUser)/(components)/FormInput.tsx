"use client"
import { createClient } from "@/lib/supabase/client"
import { useGlobalState } from "@/lib/state"
import { useEffect } from "react"
import { Button, TextField } from "@mui/material"
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Border color when hovered
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Border color when focused
    },
  },
}));

interface formInputType {
  action: any,
  textButton: string,
  disabledBtn?: boolean,
}

export default function FormInput(props: formInputType) {
  const supabase = createClient()

  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')
  const [idUser, setIdUser] = useGlobalState('idUser')
  const [headPost, setHeadPost] = useGlobalState('headPost')
  const [bodyPost, setBodyPost] = useGlobalState('bodyPost')
  const [label, setLabel] = useGlobalState('labelPost')

  const getUserByUsername = async () => {
    const { data: users, error } = await supabase
    .from('users')
    .select('*').eq('username', usernameLogin).maybeSingle()

    users.id ? setIdUser(users.id) : null
  }

  useEffect(() => {
    if (usernameLogin) {
      getUserByUsername()
    }
  }, [usernameLogin])

  return (
    <div>
      <form action={props.action}>
        <div>
          <CustomTextField required
            variant="outlined"
            label='Title Head'
            className="w-full mb-4"
            value={headPost}
            onChange={(e) => setHeadPost(e.target.value)}
            sx={{ input: { color: "white", borderColor: 'white', outlineColor: 'white' } }}
            InputLabelProps={{
              style: { color: 'white' }, // Change label color to white
            }}
            inputProps={{ style: { color: 'white' } }} // Change text color to white
          />
          
          <textarea required placeholder="Text Body*"
            className="border bg-transparent border-1 border-white target:border-blue-500 outline-none rounded-md w-full py-2 px-4 mb-4"
            value={bodyPost}
            rows={8}
            onChange={(e) => setBodyPost(e.target.value)}
          ></textarea>

          <CustomTextField required
            variant="outlined"
            label='Label'
            className="mb-4 mt-4"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            sx={{ input: { color: "white", borderColor: 'white', outlineColor: 'white' } }}
            InputLabelProps={{
              style: { color: 'white' }, // Change label color to white
            }}
            inputProps={{ style: { color: 'white' } }} // Change text color to white
          />

        </div>
        <div className="flex justify-end w-full mb-6">
          <Button type="submit" className="capitalize border border-white hover:border-blue-200 text-white hover:text-blue-200" variant="outlined" disabled={props.disabledBtn}>
            {props.textButton}
          </Button>
        </div>
      </form>
    </div>
  )
}