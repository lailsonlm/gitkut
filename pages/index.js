import MainGrid from '../src/components/MainGrid'
import DivGrid from '../src/components/DivGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.user}.png`} alt="Perfil Usuário" className="imgProfile"/>
    </Box>
  )
}

export default function Home() {
  const user = 'lailsonlm';
  const favoritePeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini']

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <DivGrid className="profileArea">
          <ProfileSidebar user={user}/>
        </DivGrid>

        <DivGrid className="welcomeArea">
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </DivGrid>

        <DivGrid className="profileRelations">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((currentItem) => {
                return (
                  <li>
                    <a href={`/users/${currentItem}`} key={currentItem}>
                    <img src={`https://github.com/${currentItem}.png`} alt="Perfil Usuário" className="imgProfile"/>
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
