import React from 'react';
import { Typography } from '@material-ui/core'

interface titleProps {
    children: React.ReactNode
}

export default function Title(props: titleProps) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    )
}