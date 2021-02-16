import styled from 'styled-components';

export const AccountContainer = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-top: 50px;
    /* margin-left: auto; */
    /* margin-right: auto; */
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const CalendarContainer = styled.div`
    margin: 50px auto;
    width: 2000px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 100%;
    padding: 10px;

    @media screen and (max-width: 820px) {
        margin: 50px auto;
        font-size: small;
        height: 100%;
        width: 100%;
    }
`;

export const ParentCalendarContainer = styled.div`
    width: 90vw;
    display: flex;
    /* height: 100vh; */
`;