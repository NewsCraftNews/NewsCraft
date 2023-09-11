import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function CommentBox() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '50ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Write Comment"
          multiline
          rows={4}
        />
      </div>
      <Button>Post</Button>
      <br/>
    </Box>
  );
}
