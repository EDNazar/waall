import { useQuery } from "@tanstack/react-query"
import userService from "../../../services/user.service"


export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],  // Ключ запроса теперь внутри объекта
    queryFn: () => userService.getProfile(),  // Функция запроса
    select: ({ data }) => data  // Опции тоже внутри объекта
  });
};

// export const useProfile = () => {
//     return useQuery(['get profile'], () => userService.getProfile(), {
//         select: ({ data }) => data
//     })
// }