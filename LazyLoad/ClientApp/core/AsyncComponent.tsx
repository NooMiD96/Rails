import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

export function AsyncComponent(ComponentLoader: any){
    class AsyncComponent extends React.Component<RouteComponentProps<{}>, {Component: any}>{
        constructor(props: any){
            super(props);
            this.state = {
                Component: null
            };
        }

        async componentDidMount(){
            var Component = await ComponentLoader();
            this.setState({
                Component: Component.default
            });
        }

        render(){
            var Component = this.state.Component;

            return <div>
                {
                    (Component && <Component routeProps />) || <p>Loading...</p>
                }
            </div>
        }
    }

    return AsyncComponent;
}
