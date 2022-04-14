import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }: {providers:ClientSafeProvider[]}) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(_context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
