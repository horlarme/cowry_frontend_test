import User from './User'

export default interface Photo {
    "id": string,
    "created_at": string,
    "width": string,
    "height": string,
    "color": string,
    "blur_hash": string,
    "likes": string,
    "liked_by_user": string,
    "description": string,
    "user": User,
    "current_user_collections": [],
    "urls": {
        "raw": string,
        "full": string,
        "regular": string,
        "small": string,
        "thumb": string,
    },
    "links": {
        "self": string,
        "html": string,
        "download": string,
    }
}
