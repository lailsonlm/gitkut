import styled from 'styled-components';

const MainGridSecondary = styled.main`
  display: grid;
  grid-gap: 10px;
  padding: 16px;

  width: 100%;
  max-width: 500px;
  margin: 50px auto 0;
  
  @media(min-width: 860px) {
    max-width: 1110px;
    grid-template-areas: "profileArea welcomeArea";
    grid-template-columns: 160px 2fr;
  }

  #top {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      color: var(--textPrimaryColor);
      font-size: 40px;
      font-family: sans-serif;
      padding: 10px;

      right: 30px;
      bottom: 2vh;

      background-color: var(--backgroundSecondary);
      border: none;
      border-radius: 8px;

      @media(max-width: 1270px) {
        right: 5px;
    
        }
    }
`;

export default MainGridSecondary;