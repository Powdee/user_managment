import axios from "axios";

namespace UsersManagement {
  const URL: string = 'http://localhost:3000'

  export interface ILogin {
    email: string | null
    password: string | null
  }

  export interface IUser extends ILogin {
    firstName: string | null
    lastName: string | null
  }

  export interface IFullUser extends IUser {
    id: string | null
  }

  export interface ICurrentUser {
    id: string | null
    firstName: string | null
    lastName: string | null
  }

  export interface ICreateUser extends ICurrentUser {
    email: string | null
  }

  export class API {
    static login = async (body: ILogin): Promise<any> => {
      const { data } =  await axios.post(`${URL}/login`, body, {
        headers: {
          'Content-type': 'application/json'
        },
      })

      return data;
    }

    static signUp = async (body: IUser): Promise<void> => {
      await axios.post(`${URL}/signUp`, body, {
        headers: {
          'Content-type': 'application/json'
        },
      })
    }

    static getUsers = async (): Promise<IFullUser[]> => {
      const accessToken = localStorage.getItem('JWT-accessToken')
      const { data } =  await axios.get(`${URL}/users`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })

      return data
    }

    static createUser = async (body: IUser): Promise<ICreateUser> => {
      const accessToken = localStorage.getItem('JWT-accessToken')
      const { data } =  await axios.post(`${URL}/users`, body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })

      return data
    }

    static deleteUser = async (id: string): Promise<void> => {
      const accessToken = localStorage.getItem('JWT-accessToken')
      await fetch(`${URL}/users/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
    }
  }

  interface ILocalStorage {
    item: string,
    value: string
  }

  export class JWT {
    static parseJwt = (token: string): any | null => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };

    static storeInLocalStorage = (items: ILocalStorage[]) => {
      items.forEach(({ item, value }) => localStorage.setItem(item, value))
    }

    static deleteLocalStorage = (items: ILocalStorage[]) => {
      items.forEach(({ item }) => localStorage.removeItem(item))
    }
  }
}

export default UsersManagement