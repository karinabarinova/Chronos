import styled from 'styled-components'

export const Container = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

export const TextContainer = styled.div`
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 24px;
    align-items: center;
`;

export const InputBlock = styled.div`
    padding-bottom: 8px;
    margin-bottom: 8px;
    margin-top: 8px;
`;

export const Input = styled.input`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 1ch;
    width: 100%;
    height: 2.5rem;
`;

export const InputTime = styled.input`
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 1ch;

    width: 50%;
    padding: 8px;
    height: 2.5rem;
`;

export const CloseButton = styled.button`
    padding: 6px;
    border: none;
    font-size: 16px;
`;