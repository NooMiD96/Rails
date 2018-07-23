import styled from "styled-components";

export default styled.div`
    min-height: 320px;

    ${(props: any) => props.isLoading
        ? "visibility: hidden;"
        : "visibility: visible;"
    }
`;
