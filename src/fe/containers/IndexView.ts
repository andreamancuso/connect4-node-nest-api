import {connect} from "react-redux";

import IndexView from '../components/IndexView';

import {GenericDispatch, State} from "../types";
import {createGameThunk} from "../thunks/game";

interface StateFromProps {

}


interface DispatchFromProps {
    beginNewGame: () => Promise<string>
}

const mapStateToProps = (state: State): StateFromProps => ({

});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    beginNewGame(): Promise<string> {
        return dispatch(createGameThunk());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
