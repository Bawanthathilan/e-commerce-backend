import { v2 as cloudinary } from 'cloudinary'
import { CLOUD_NAME , CLOUD_API_KEY , CLOUD_SECRET_KEY } from '../secrets'

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:CLOUD_API_KEY,
    api_secret:CLOUD_SECRET_KEY
  })

export {
    cloudinary,
}