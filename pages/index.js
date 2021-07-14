import React from 'react'

import MainGrid from '../src/components/MainGrid'
import DivGrid from '../src/components/DivGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.user}.png`} alt="Perfil Usuário" className="imgProfile" />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.user}`}>
          @{props.user}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
  const [communities, setCommunities] = React.useState([])
  const user = 'lailsonlm';
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
  ]

  function CreateCommunity(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      img: formData.get('image')
    }
    
    setCommunities([...communities, community])
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <DivGrid className="profileArea">
          <ProfileSidebar user={user} />
        </DivGrid>

        <DivGrid className="welcomeArea">
          <Box>
            <h1 className="title">
              Bem-vindo(a)
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

        <DivGrid className="profileRelations">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((currentItem) => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/users/${currentItem.title}`} >
                      {<img src={currentItem.img} alt="Capa da Comunidade" className="imgProfile" />}
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`} >
                      <img src={`https://github.com/${currentItem}.png`} alt="Perfil Usuário" className="imgProfile" />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </DivGrid>
      </MainGrid>
    </>
  )
}


