import React, { Component } from 'react'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'

type Props = {
  providers: ClientSafeProvider[]
}

type State = {}

export default class index extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div>index</div>
        <div>JAAA</div>
        {Object.values(this.props.providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
    )
  }
}
export async function getServerSideProps(_context: any) {
  console.log('test')
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
