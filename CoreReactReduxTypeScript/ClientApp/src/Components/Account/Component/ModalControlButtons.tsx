import * as React from "react";
import Button from "@core/antd/Button";

type ModalControlButtonsProps = {
    HandleSubmit: () => void,
    HandleCancel: () => void,
    loading: boolean,
    returnTitle: string,
    submitTitle: string,
};

const ModalControlButtons = (props: ModalControlButtonsProps) => (
    <React.Fragment>
        <Button
            key="back"
            loading={props.loading}
            onClick={props.HandleCancel}
        >
            {props.returnTitle}
        </Button>
        <Button
            key="submit"
            type="primary"
            loading={props.loading}
            onClick={props.HandleSubmit}
        >
            {props.submitTitle}
        </Button>
    </React.Fragment>
);

export default ModalControlButtons;
