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

export const Select = styled.select`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 1ch;
    width: 100%;
    height: 2.5rem;
`;

export const InputBlockFlex = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const InputColor = styled.input`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 1ch;
    width: 50px;
    /* width: 100%; */
    height: 2.5rem;
`;

export const InputDescription = styled.input`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 1ch;
    width: 25vw;
    height: 2.5rem;
`;

export const CloseButton = styled.button`
    border-radius: 4px;
    background: #0467FB;
    white-space: nowrap;
    padding: 4px 8px;
    margin-bottom: 8px;
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
`;