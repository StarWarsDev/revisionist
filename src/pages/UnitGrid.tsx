import React from "react";
import PageHeader from "../components/PageHeader";
import { Units } from "../model/unit";

interface Props {
  units: Units;
}

export function UnitGrid(props: Props) {
  const { units } = props;

  return (
    <React.Fragment>
      <PageHeader title="Units" />
    </React.Fragment>
  );
}
