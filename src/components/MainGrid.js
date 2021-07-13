import styled from 'styled-components';

const MainGrid = styled.main`
  display: grid;
  grid-gap: 10px;
  padding: 16px;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  @media(min-width: 860px) {
    max-width: 1110px;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

export default MainGrid;