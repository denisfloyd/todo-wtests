import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.text};

  text-align: center;

  form {
    margin: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const List = styled.ul`
  list-style: none;
`;

export const TodoElement = styled.li`
  width: 200px;
  display: flex;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
  margin: 0.2rem;
  padding: 0.2rem;
  border-radius: 4px;
`;

export const TodoInput = styled.input`
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  outline: 0;
`;

interface ButtonProps {
  addBackground?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: transparent;

  ${(props) =>
    props.addBackground &&
    css`
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primary[500]};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary[600]};
      }
    `}

  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  border: none;
  transition: background-color 0.2s;
`;
