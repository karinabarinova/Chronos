import styled from 'styled-components'

export const SidebarContainer = styled.div`
    z-index: 1;
    width: 30%;
    max-width: 1300px;
    margin-top: 50px;
    /* margin-left: auto; */
    margin-right: 0;
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;