import { Box } from '@mui/material'
import React from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactPlayer from 'react-player';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function VideoContainer() {
    return (
        <Box sx={{ padding: '100px'}}>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <div >
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                </div>
                <div>
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=EngW7tLk6R8' />
                </div>
                <div>
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                </div>
                <div>
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=EngW7tLk6R8' />
                </div>
                <div>
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
                </div>
                <div>
                    <ReactPlayer autoPlay url='https://www.youtube.com/watch?v=EngW7tLk6R8' />
                </div>
            </Carousel>
        </Box>
    )
}

export default VideoContainer