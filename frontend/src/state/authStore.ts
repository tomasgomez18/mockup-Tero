const SESSION_KEY = 'nexus-admin-session'

export const demoCredentials = {
  email: 'admin@tienda.com',
  password: 'admin123',
}

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

let sessionEmail = loadSession()
const listeners = new Set<() => void>()

function setSession(email: string | null) {
  sessionEmail = email
  try {
    if (email) localStorage.setItem(SESSION_KEY, email)
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    sessionEmail = email
  }
  listeners.forEach((listener) => listener())
}

export const authStore = {
  getSnapshot: () => sessionEmail,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export function login(email: string, password: string) {
  const isValid =
    email.trim().toLowerCase() === demoCredentials.email && password === demoCredentials.password
  if (isValid) setSession(demoCredentials.email)
  return isValid
}

export function logout() {
  setSession(null)
}
