import { create } from 'zustand';
import {persist} from 'zustand/middleware'
type TUser = {
    id:  null | number,
    name: string
    email: string
    token: string
    setName: (name: string) => void
    setEmail: (email: string) => void
    setToken: (token: string) => void
    setId: (id: number) => void
  }
  
 
  

 const useUser = create<TUser>()(
     persist((set) => ({
   id: null,   
   name: '',
   email:'',
   token:'',
  setName: (name:string) => set(()=> ({name: name})),
  setEmail: (email:string) => set(()=> ({email: email})),
  setToken: (token:string) => set(()=> ({token: token})),
  setId: (id:number) => set(()=> ({id: id})),
  }),{
    name: 'user'
  }
  )
  )

  export default useUser;