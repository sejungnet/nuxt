import video from '~/database/video'

export default defineEventHandler((event) => {
    return video.slice(20, 40)
})
