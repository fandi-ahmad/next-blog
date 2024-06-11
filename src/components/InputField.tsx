"use client"
import { TextField } from "@mui/material";
import { styled } from '@mui/system'

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
}));

type inputProps = {
  label?: string,
  name?: string,
  type: string,
}

export default function InputField(props: inputProps) {
  return (
    <CustomTextField required
      variant='outlined'
      label={props.label}
      name={props.name}
      type={props.type}
      className='w-full mb-4'
      sx={{ input: { color: "white", borderColor: 'white', outlineColor: 'white' } }}
      InputLabelProps={{
        style: { color: 'white' },
      }}
      inputProps={{ style: { color: 'white' } }}
    />
  )
}
