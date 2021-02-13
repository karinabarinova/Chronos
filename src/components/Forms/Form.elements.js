import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
    margin: 100px auto;
    width: 1000px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (max-width: 820px) {
        margin: 50px auto;
        width: 90%;
        grid-template-columns: 1fr;
    }

`;

export const CalendarContainer = styled.div`
    margin: 50px auto;
    width: 1200px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 100%;
    padding: 10px;

    @media screen and (max-width: 820px) {
        margin: 50px auto;
        width: 90%;
        grid-template-columns: 1fr;
    }

`;

export const CloseButton = styled.button`
    position: absolute;
    top: 2%;
    right: 3%;
    font-size: 1.5rem;
    z-index: 1;
    color: #fff;
    background-color: #0467fb;
    border-radius: 5px;
    border: none;
    padding: 2px 5px;
    cursor: pointer;
`;

export const FormContentLeft = styled.div`
    background: linear-gradient(
      90deg,
      rgb(4, 103, 251) 0%,
      rgb(84, 97, 240) 100%
    );
    border-radius: 10px 0 0 10px;
    position: relative;

    @media screen and (max-width: 820px) {
        display: none;
    }
`;

export const FormContentRight = styled.div`
    border-radius: 0 10px 10px 0;
    position: relative;
    background: linear-gradient(90deg, rgb(16, 21, 34) 0%, rgb(16, 21, 34) 100%);
`;

export const Form = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Heading = styled.h1`
    font-size: 1rem;
    text-align: start;
    width: 80%;
    margin-bottom: 1rem;
    color: #fff;
`;

export const FormInputs = styled.div`
    margin-bottom: 0.5rem;
    width: 80%;
`;

export const Error = styled.p`
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: #f00e0e;
`;

export const FormLabel = styled.label`
    display: inline-block;
    font-size: 0.8rem;
    margin-bottom: 6px;
    color: #fff;
`;

export const FormInput = styled.input`
    display: block;
    padding-left: 10px;
    outline: none;
    border-radius: 2px;
    height: 40px;
    width: 100%;
    border: none;

    &::placeholder {
        color: #595959;
        font-size: 16px;
    }
`;

export const FormInputLoginSpan = styled.span`
    font-size: 0.8rem;
    margin-top: 10px;
    color: #fff;
    width: 80%;
    text-align: center;
`;

export const FormInputLoginLink = styled(Link)`
    text-decoration: none;
    color: #0467fb;
    font-weight: 600;
`;

export const FormInputButton = styled.button`
    width: 80%;
    height: 50px;
    margin-top: 10px;
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      rgb(4 103 251) 0%,
      rgb(84, 97, 240) 100%
    );
    outline: none;
    border: none;
    color: #fff;
    font-size: 1rem;

    &:hover {
        cursor: pointer;
        background: linear-gradient(
        90deg,
        rgb(86, 47, 224) 0%,
        rgb(4 103 251) 100%
        );
        transition: all 0.4s ease-out;
    }
`;

export const FormImage = styled.img`
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: 820px) {
        display: none
    }
`;

export const FormImage2 = styled.img`
    width: 60%;
    height: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const FormSuccess = styled.h1`
    text-align: center;
    font-size: 24px;
    margin-top: 80px;
    color: #fff;
`;