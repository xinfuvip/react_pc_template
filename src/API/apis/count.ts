import { fetchApi } from 'API/request'

export const getPetDetail = async (id: number) => {
  return await fetchApi({
    url: `/pet/${id}`,
    method: 'GET'
  })
}
