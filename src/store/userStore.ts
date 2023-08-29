import { create } from 'zustand';
import {persist} from 'zustand/middleware'
type TUser = {
    name: string
    email: string
    token: string
    setName: (name: string) => void
    setEmail: (email: string) => void
    setToken: (token: string) => void
  }
  
 
  

 const useUser = create<TUser>()(
     persist((set) => ({
   name: '',
   email:'',
   token:'',
  setName: (name:string) => set(()=> ({name: name})),
  setEmail: (email:string) => set(()=> ({email: email})),
  setToken: (token:string) => set(()=> ({token: token})),
  }),{
    name: 'user'
  }
  )
  )

  export default useUser;