import { React, useEffect, useState } from 'react'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from '../src/components/MainGrid'
import DivGrid from '../src/components/DivGrid'
import Box from '../src/components/Box'
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ProfileRelations from '../src/components/ProfileRelations'

<ProfileSidebar />


export default function Home(props) {
  const user = props.githubUser;
  const [userName, setUserName] = useState('')

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}`).then((res) => res.json()).then((res) => setUserName(res.name.split(' ').slice(0,1)))
  }, [])


  function CreateCommunity(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    // Guardando dados da tela
    const community = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: user
    }
    
    // Fetch com api no back-end
    fetch('./api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community)
    }).then(async (res) => {
      const data = await res.json()
      console.log(data.communityCreated)

      const community = data.communityCreated
      setCommunities([community,...communities])
    })
  }

  return (
    <>
      <AlurakutMenu githubUser={user}/>
      <MainGrid>
        <DivGrid className="profileArea">
          <ProfileSidebar user={user} />
        </DivGrid>

        <DivGrid className="welcomeArea">
          <Box>
            <h1 className="title">
              Bem-vindo(a), {userName}!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form action="" onSubmit={CreateCommunity}>
              <div>
                <input type="text"
                  name="title"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input type="text"
                  name="image"
                  area-label="Coloque uma URL para usarmos de capa"
                  placeholder="Coloque uma URL para usarmos de capa" />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </DivGrid>

        <ProfileRelations user={user} />
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  
  const { isAuthenticated } = await fetch('https://gitkut-lailsonlm.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    }
  }).then((res) => res.json())
  
  console.log('isAuthenticated', isAuthenticated)
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  
  return {
    props: {
      githubUser,
      isAuthenticated
    },
  }
}
