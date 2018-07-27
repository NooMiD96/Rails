import * as React from "react";
import Button from "@core/antd/Button";

type ActionButtonsProps = {
    HandleSubmit: () => void,
    HandleCancel: () => void,
    loading: boolean,
    returnTitle: string,
    submitTitle: string,
};

const ActionButtons = (props: ActionButtonsProps) => (
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

export default ActionButtons;
