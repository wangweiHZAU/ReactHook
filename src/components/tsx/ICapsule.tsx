interface ICapsule {
  name: string
  email: string
  time: string
  content: string
  tips?: string
}

interface Upload {
  stat: string
  id: string
}

export type { ICapsule, Upload }
