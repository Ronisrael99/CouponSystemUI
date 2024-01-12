import { PaperProps, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {FC} from "react";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

interface Props {
    title: string,
    children: string | JSX.Element | JSX.Element[]
}

export const TitledCard: FC<Props & PaperProps> = ({title, children, ...props}) => {
    return <Paper elevation={3}
                  {...props}
                  sx={{
                      borderRadius: 5,
                      p: 3,
                      minHeight: 500,
                      minWidth: 500,
                      ...props.sx
                  }}
    >
        <>
            <Typography variant="h2" mt={2} textAlign="center">{title}</Typography>
            {children}
        </>
    </Paper>
}