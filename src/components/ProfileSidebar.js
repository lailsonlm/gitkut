import { AlurakutProfileSidebarMenuDefault } from '../lib/AlurakutCommons'
import Box from './Box'

export default function ProfileSidebar(props) {
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

