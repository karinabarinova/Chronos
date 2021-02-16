import styled from 'styled-components';

export const Container = styled.div`
    z-index: 1;
    width: 100vw;
    max-width: 1500px;
    display: flex;
    justify-content: flex-end;
    padding-right: 100px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const Button = styled.button`
    border-radius: 4px;
    background: #0467FB;
    white-space: nowrap;
    padding: 12px 64px;
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #101522;
    }

    @media screen and (max-width: 960px) {
        width: 50%;
    }
`
