import styled from "styled-components";

const AsyncComponent = styled.div`
    min-height: 320px;
    
    ${props => props.isLoading
        ? "visibility: hidden;"
        : "visibility: visible;"
    }
`

export default AsyncComponent;