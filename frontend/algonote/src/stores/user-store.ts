import { create } from 'zustand'

interface UserInfoType {
  email: string
  memberId: number
  nickname: string
  profileImg: string
}

interface UserInfoState {
  userInfo: UserInfoType
}

interface UserInfoActions {
  setUserInfo: (userInfo: UserInfoType) => void
  deleteUserInfo: () => void
}

const defaultState = {
  email: '',
  memberId: 0,
  nickname: '',
  profileImg: '',
}

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo: UserInfoType) => {
    console.log('user-store', userInfo)

    set({ userInfo })
    // console.log('set')
    // console.log(userInfo)
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState })
    // console.log('delete')
  },
}))

export default useUserInfo
