import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { ArrowLeft, Info } from 'lucide-react'
import Button from '@/components/button/Button'
import TextField from '@/components/form/textField/TextField'
import { useAuth } from '@/hooks/useAuth'
import { useStoreContent } from '@/hooks/useStoreContent'
import { demoCredentials, login } from '@/state/authStore'

function AdminLogin() {
  const { isAuthenticated } = useAuth()
  const { storeInfo } = useStoreContent()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/admin" replace />

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (login(email, password)) {
      navigate('/admin', { replace: true })
    } else {
      setError('El email o la contraseña no son correctos')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-2xl font-semibold tracking-[0.25em] uppercase">{storeInfo.name}</p>
          <p className="mt-2 text-sm text-neutral-500">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-card bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8"
        >
          <h1 className="text-xl font-semibold tracking-tight">Iniciar sesión</h1>
          <TextField
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            error={error}
          />
          <Button type="submit" size="lg" className="mt-1 w-full">
            Ingresar
          </Button>
        </form>

        <div className="mt-4 flex gap-3 rounded-card bg-white/60 p-4 text-sm text-neutral-600 ring-1 ring-neutral-900/5">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            Acceso de demostración: <strong>{demoCredentials.email}</strong> /{' '}
            <strong>{demoCredentials.password}</strong>
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="size-4" />
          Volver a la tienda
        </Link>
      </div>
    </div>
  )
}

export default AdminLogin
