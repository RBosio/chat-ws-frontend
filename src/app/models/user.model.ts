export interface UserLoginI {
  email: string
  password: string
}

export interface UserSignupI {
  name: string
  surname: string
  email: string
  password: string
  dni: string
  phone: string
  cityZipCode: string
}

export interface UserIResponse {
  id: number
  name: string
  surname: string
  email: string
  password: string
  groups: UserIResponse[]
  url: string
  nameGroup: string
}
