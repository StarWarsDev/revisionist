import React, {createContext, useContext, useReducer} from 'react'
import {getEmptyLegionData} from "./index";
import LegionData, {LdfNamePair} from "../model";

interface Props {
    children: React.ReactChildren | Element | React.ReactChild;
}

interface IState {
    data: LegionData;
    unitNames: LdfNamePair;
    upgradeNames: LdfNamePair;
}

interface ILegionDataContext {
    state: typeof initialState;
    dispatch: (action: Action) => void
}

type Action =
    | { type: "legion-data-changed", data: LegionData }
    | { type: "unit-names-changed", unitNames: LdfNamePair }
    | { type: "upgrade-names-changed", upgradeNames: LdfNamePair }

const initialState: IState = {
    data: getEmptyLegionData(),
    unitNames: {},
    upgradeNames: {}
};

const LegionDataContext = createContext<ILegionDataContext>({
    state: initialState,
    dispatch: () => {}
});

const reducer = (state: IState, action: Action) => {
    switch (action.type) {
        case "unit-names-changed":
            return {
                ...state,
                unitNames: action.unitNames
            };
        case "upgrade-names-changed":
            return {
                ...state,
                upgradeNames: action.upgradeNames
            };
        case "legion-data-changed":
            return {
                ...state,
                data: { ...action.data }
            };

        default:
            return state
    }
};

export const LegionDataProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LegionDataContext.Provider value={{state, dispatch}}>
            {children}
        </LegionDataContext.Provider>
    )
};

export const useStore = () => useContext(LegionDataContext);