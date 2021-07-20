import styled from "styled-components";

const Box = styled.div`
    background: #2D333B;
    border-radius: 8px;
    
    margin-bottom: 10px;
    padding: 16px;

    .boxLink {
        font-size: 14px;
        color: #4A88D5;
        text-decoration: none;
        font-weight: 800;
    }

    .title {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    .subTitle {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    .smallTitle {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #ADBAC7;
    }

    hr {
        margin: 12px 0 8px 0;
        border-color: transparent;
        border-bottom-color: #5A5A5A;
    }

    input {
        width: 100%;
        background-color: #1F242B;
        color: #ADBAC7;
        border: 0;
        padding: 14px 16px;
        margin-bottom: 14px;
        border-radius: 10000px;
        border: 1px solid #373E47;
        ::placeholder {
            color: #5A5A5A;
            opacity: 1;
        }
    }

    button {
        border: 0;
        padding: 8px 12px;
        color: #ffffff;
        border-radius: 10000px;
        background-color: #46954A;
    }
`;

export default Box