export interface Register{
    username: string
    image: string
    password: string
}

export interface Login{
    username: string
    password: string
}

export interface Transfer{
    amount:number
    username: string
}

export interface ServrResponse{
    success: boolean
    error: string
}