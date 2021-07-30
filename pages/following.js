import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { React, useEffect, useState } from 'react';

import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import MainGridSecondary from '../src/components/MainGridSecondary'
import DivGrid from '../src/components/DivGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import Box from '../src/components/Box';
import styled from 'styled-components';

export const FollowingBoxWrapper = styled.div`
  ul {
    display: grid;
    grid-gap: 10px;
    height: 100%;
    list-style: none;
    padding: 4px;

    grid-template-columns: 1fr 1fr 1fr;

        @media(max-width: 1024px) {
            grid-template-columns: 1fr 1fr;
        }

        @media(max-width: 860px) {
            grid-template-columns: 1fr;
        }
  }
  img {
    max-width: 70%;
    max-height: 70%;
    border-radius: 8px;
  }
  ul a {
    display: flex;
    align-items: center;
    height: 102px;
    overflow: hidden;
    text-decoration: none;
  }

  li {
      display: flex;
      align-items: center;

      h2 {
          color: var(--textPrimaryColor);
          font-size: 18px;
          padding: 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          margin-left: 10px;
        }
  }

  .title {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
    }
`;


function FollowingRelationsBox(props) {
    // const [followerLocation, setFollowerLocation] = useState('')
    // props.items.map((currentItem) => {
    //     const test = currentItem.login

    //     fetch(`https://api.github.com/users/${test}`).then((res) => res.json()).then((res) => res.location)
    // })

    // console.log(followerLocation)

    return (
        <>
            <FollowingBoxWrapper>
                <h1 className="title">
                    {props.title} ({props.count})
                </h1>
                <ul>
                    {props.items.map((currentItem) => (
                        <Box>
                            <li key={currentItem.login}>
                                <a href={`https://github.com/${currentItem.login}`} target='_blank' >
                                    {<img src={`https://github.com/${currentItem.login}.png`} alt="Perfil Usuário" className="imgProfile" />}
                                <h2>{currentItem.login}</h2>
                                </a>
                            </li>
                        </Box>
                    ))}
                    <li id="next-pag"></li>
                </ul>
            </FollowingBoxWrapper>
        </>
    )
}

export default function Following(props) {
    const user = props.githubUser;

    const [following, setFollowing] = useState([])
    const [followingCount, setFollowingCount] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const ENDPOINT = `https://api.github.com/users/${user}/following`
        const URL_CONFIG = `${ENDPOINT}?per_page=10&page=${currentPage}&order=DESC`
        fetch(URL_CONFIG).then((res) => res.json()).then((newFollowing) => setFollowing((prevFollowing) => [...prevFollowing, ...newFollowing]))
    }, [currentPage])

    useEffect(() => {
        // Count Following
        fetch(`https://api.github.com/users/${user}`).then((res) => res.json()).then((res) => setFollowingCount(res.following))
    }, [])

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setCurrentPage((currentPageInsideState) => currentPageInsideState + 1)
            }
        })

        const nextPag = document.querySelector('#next-pag')

        intersectionObserver.observe(nextPag)

        return () => intersectionObserver.disconnect()
    }, [])

    return (
        <>
            <AlurakutMenu githubUser={user} />
            <MainGridSecondary>
                <DivGrid className="profileArea">
                    <ProfileSidebar user={user} />
                </DivGrid>

                <DivGrid className="welcomeArea">
                    <FollowingRelationsBox title="Seguindo" items={following} count={followingCount} />
                </DivGrid>
                {followingCount > 10 ? <button id="top" onClick={() => {
                    addEventListener('click', () => window.scrollTo(0, 0))
                }}>
                    <img src="/up_arrow.svg" alt="Voltar ao Topo" />
                </button> : ''}

            </MainGridSecondary>
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

    if (!isAuthenticated) {
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