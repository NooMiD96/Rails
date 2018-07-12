import * as React from 'react';

class AsyncComponentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Component: null
        };
    }

    async componentDidMount() {
        const Component = await this.props.ComponentLoader();
        this.setState({
            Component: Component.default
        });
    }

    render() {
        const Component = this.state.Component;
        return <div>
            {
                (
                    Component && <Component {...this.props} />
                ) || <p>Loading...</p>
            }
        </div>
    }
}

export const AsyncComponent = (ComponentLoader) => (props) => (
    <AsyncComponentClass
        {...props}
        ComponentLoader={ComponentLoader}
    />
);
