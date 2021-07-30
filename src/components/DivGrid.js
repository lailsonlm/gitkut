import styled from 'styled-components'

const DivGrid = styled.div`
&.profileArea {
    grid-area: "profileArea";

    @media(max-width: 860px) {
      display: none;
    }
  }

  &.welcomeArea {
    grid-area: "welcomeArea";
  }

  &.profileRelations {
    grid-area: "profileRelationsArea";
  }
  `;

export default DivGrid;