import { API_URLS } from '../config'
import { Question } from '../types/types'

export async function callAPI<T>(
  url: string,
  method: string,
  body?: unknown
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

// Function to fetch Questionss (GET)
export async function fetchQuestions(): Promise<Question[]> {
  return callAPI<Question[]>(API_URLS.WORDS, 'GET')
}

// Function to add a new Question (POST)
export async function addQuestions(Question: Question): Promise<void> {
  await callAPI<void>(API_URLS.WORDS, 'POST', Question)
}

// Function to update an existing Question (PUT)
export async function updateQuestions(Question: Question): Promise<void> {
  await callAPI<void>(API_URLS.WORDS, 'PUT', Question)
}

// Function to delete a Question (DELETE)
export async function deleteQuestions(id: number): Promise<void> {
  const url = `${API_URLS}?id=${id}`
  await callAPI<void>(url, 'DELETE')
}
