import { getPetDetail } from 'API/apis/count'
import { atom } from 'jotai'
export const countAtom = atom(0)
export const doubledCountAtom = atom((get) => get(countAtom) * 2)

// async atom
export const timeAtom = atom('1')

export const fetchDataAtom = atom(
  async (get) => {
    return await getPetDetail(get(timeAtom))
  },
  [timeAtom]
)
