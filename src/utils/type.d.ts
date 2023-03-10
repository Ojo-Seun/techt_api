interface Note {
  id?: string
  title: string
  content: string
  user_id: string
}

type Notes = Note[]

interface User {
  name: string
  email: string
  user_id?: string
  isAdmin: boolean
  password: string
}

type Users = User[]

export { Note, Notes, User, Users }
