import styled from 'styled-components'

export const SidebarContainer = styled.div`
    z-index: 1;
    width: 25%;
    max-width: 1300px;
    margin-top: 70px;
    /* margin-left: auto; */
    margin-right: 0;
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const SidebarTitle = styled.h3`
    margin: 16px;
`;

export const NewCalendarButton = styled.button`
    margin-top: 16px;
    padding: 16px;
    border: none;
    background: #fff;
    color: #0467FB;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;