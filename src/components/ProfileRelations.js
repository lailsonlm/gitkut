import styled from 'styled-components';
import Box from './Box';
import DivGrid from './DivGrid';

import { React, useState, useEffect } from 'react'

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
  .viewAll {
    display: flex;
    text-decoration: none;
    color: #4A88D5;
    font-size: 13px;

    padding: 10px 0 0;
  }
`;

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
            {props.count > 6 ?  <a href={props.link} className="viewAll">Ver todos</a> : ''}
            
          </ProfileRelationsBoxWrapper>
  )
}

export default function ProfileRelations(props) {
  const [communities, setCommunities] = useState([])
  const communityByUser = communities.filter((obj) => obj.creatorSlug == props.user)

  const [followers, setFollowers] = useState([])
  const [followersCount, setFollowersCount] = useState([])
  
  const [following, setFollowing] = useState([])
  const [followingCount, setFollowingCount] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${props.user}/followers`).then((res) => res.json()).then((res) => setFollowers(res))

    // Count Followers
    fetch(`https://api.github.com/users/${props.user}`).then((res) => res.json()).then((res) => setFollowersCount(res.followers))


    fetch(`https://api.github.com/users/${props.user}/following`).then((res) => res.json()).then((res) => setFollowing(res))

    // Count Following
    fetch(`https://api.github.com/users/${props.user}`).then((res) => res.json()).then((res) => setFollowingCount(res.following))


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

  return (
    <DivGrid className="profileRelations">
          <ProfileRelationsBox title="Seguidores" items={followers} count={followersCount} link="/followers"/>

          <ProfileRelationsBox title="Seguindo" items={following} count={followingCount} link="/following"/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communityByUser.length})
            </h2>
            <ul>
            {communityByUser.map((currentItem) => {
              if(currentItem.creatorSlug == props.user){
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
          </DivGrid>
  )
}