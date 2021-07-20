import { React, useState, useEffect } from 'react'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            {props.title} ({props.count})
            </h2>
             <ul>
              {props.items.map((currentItem) => {
                return (
                  <li key={currentItem.login}>
                    <a href={`https://github.com/${currentItem.login}`} target= '_blank' >
                      {<img src={`https://github.com/${currentItem.login}.png`} alt="Perfil Usuário" className="imgProfile" />}
                      <span>{currentItem.login}</span>
                    </a>
                  </li>
                )
              }).slice(0,6)}
            </ul>
            {props.count > 6 ?  <a href="" className="viewAll">Ver todos</a> : ''}
            
          </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const [communities, setCommunities] = useState([])
  const user = props.githubUser;

  const communityByUser = communities.filter((obj) => obj.creatorSlug == user)

  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
  ]

  const [followers, setFollowers] = useState([])
  const [followersCount, setFollowersCount] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}/followers`).then((res) => res.json()).then((res) => setFollowers(res))

    // Count Followers
    fetch(`https://api.github.com/users/${user}`).then((res) => res.json()).then((res) => setFollowersCount(res.followers))


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '9872abdb78da424fa4717c32f47cb2',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((res) => res.json())
    .then((res) => {
      const communitiesDatoCms = res.data.allCommunities
      setCommunities(communitiesDatoCms)     
    })
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
          <ProfileRelationsBox title="Seguidores" items={followers} count={followersCount}/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communityByUser.length})
            </h2>
            <ul>
            {communityByUser.map((currentItem) => {
              if(currentItem.creatorSlug == user){
                return (
                  <li key={currentItem.id}>
                    <a href={`/communities/${currentItem.id}`} >
                      {<img src={currentItem.imageUrl} alt="Capa da Comunidade" className="imgProfile" />}
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              }
            }).slice(0,6)}
            </ul>
            {communityByUser.length == 0 ? 'Você não possui nenhuma comunidade' : communityByUser.length > 6 ?  <a href="" className="viewAll">Ver todas</a> : ''}
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  
  const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
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
