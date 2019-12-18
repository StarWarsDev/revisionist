import React, {createContext, useContext, useReducer} from 'react'
import {getEmptyLegionData, getLegionData} from "./index";
import LegionData from "../model";

interface Props {
    children: React.ReactChildren | Element | React.ReactChild
}

const LegionDataContext = createContext(getEmptyLegionData());
const initialState: LegionData = getLegionData();

const reducer = (state: LegionData, action: string) => {
    return state
};

export const LegionDataProvider = ({ children }: Props) => {
    const [state] = useReducer(reducer, initialState);

    return (
        <LegionDataContext.Provider value={state}>
            {children}
        </LegionDataContext.Provider>
    )
};

export const useLegionData = () => useContext(LegionDataContext);