import { Data } from "./github"

export const checkUserGh = (username: string) => {
    let flag = false
    Data.forEach((item) => {
        if (item.Github_handle == username) {
            flag = true;
            return
        }
    })
    return flag
}