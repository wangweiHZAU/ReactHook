// public interface and function are stored here
import axios from 'axios'
import { ICapsule } from '../components/tsx/ICapsule'

interface SaveRes {
  stat: string
  id: string
}

interface GetRes extends ICapsule {
  stat: string
}

export async function saveCapsule(user: ICapsule) {
  // http://localhost:5501
  let result = await axios.post<SaveRes>('/api/add', JSON.stringify(user))
  return result.data
}

export async function getCapsule(id: string) {
  let result = await axios.post<GetRes>(
    '/api/get',
    JSON.stringify({
      id: id,
    }),
  )
  return result.data
}

// let res = saveCapsule({ name: '', email: '', content: '', time: '' })
// const s = async () => {
//   let res = await saveCapsule({ name: '', email: '', content: '', time: '' })
//   let p = res.id
//   let q: Upload = res
// }
