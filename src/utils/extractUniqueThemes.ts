import { Question } from '@/types/types'

export default function extractUniqueThemes(data: Question[]): string[] {
  const uniqueThemes = Array.from(new Set(data.map((item) => item.theme)))
  return uniqueThemes
}
