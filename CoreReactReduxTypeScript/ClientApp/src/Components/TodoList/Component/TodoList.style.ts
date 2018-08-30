import styled from "styled-components";

export default styled.div`
  .ant-input-group-addon {
    padding: 0;

    .ant-input-group-addon-before {
      &:hover {
        color: #40a9ff;
      }

      padding: 0 11px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .ant-row {
    margin: 10px 0;
  }
  .dnd-header-label {
    text-align: center;
    margin-bottom: 10px;
  }
`;
