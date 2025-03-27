//Write reviews on vehicles and rate vehicles using five stars

import { styled } from '@mui/material/styles';
import {Avatar, Box, colors, Divider, Grid, Stack, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const GlobalStarIcon = styled(StarIcon)(({ theme }) => ({
    color: 'gold',
    fontSize: '32px',
}));

const GlobalStarOutlineIcon = styled(StarOutlineIcon)(({ theme }) => ({
    color: 'gold',
    fontSize: '32px',
}));


const reviews = () => {
    return (
        <>
            <Box >
                <Stack spacing={2}>
                    <Typography variant="h3" color="primary">Reviews</Typography>
                    <Typography variant="h6" color="text.secondary">Overall Rating</Typography>

                    <Grid>
                        <Grid size={12}>
                            <Stack direction={"row"} spacing={2}>
                                <GlobalStarIcon/>
                                <GlobalStarIcon/>
                                <GlobalStarIcon/>
                                <GlobalStarIcon/>
                                <GlobalStarOutlineIcon/>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Typography variant="h4" color="primary">4.5</Typography>
                    <Typography variant="h6" color="primary">Out of 5</Typography>
                    <Box >
                        <Stack direction={"row"} spacing={3} mt={4}>
                            <Avatar/> <Typography variant="h6">Name</Typography><Typography variant="h6">Date</Typography>
                        </Stack>
                        <Grid mt={2}>
                            <Grid size={12}>
                                <Stack direction={"row"} spacing={2}>
                                    <GlobalStarIcon/>
                                    <GlobalStarIcon/>
                                    <GlobalStarIcon/>
                                    <GlobalStarIcon/>
                                    <GlobalStarOutlineIcon/>
                                </Stack>
                            </Grid>
                            <Grid mt={2} container size={6}>
                                <Typography variant={"body1"} color="text.primary" mt={2}>
                                    some text of the comments here ome text o
                                    f the comments here ome text of the comments here
                                    some text of the comments here ome text o
                                    f the comments here ome text of the comments here
                                    some text of the comments here ome text o
                                    f the comments here ome text of the comments here
                                    some text of the comments here ome text o
                                    f the comments here ome text of the comments here
                                </Typography>

                            </Grid>
                            <Grid container size={6}></Grid>
                        </Grid>

                    </Box>
                </Stack>
            </Box>
        </>

    );
};

export default reviews;