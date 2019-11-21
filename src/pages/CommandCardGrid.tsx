import React from "react";
import CommandCard from "../model/command-card";
import CommandCardCard from "../components/CommandCardCard";
import { Grid } from "@material-ui/core";
import PageHeader from "../components/PageHeader";

interface Props {
  commandCards: CommandCard[];
}

export default function CommandCardGrid(props: Props) {
  const { commandCards } = props;
  return (
    <React.Fragment>
      <PageHeader title="Command Cards" />
      <Grid container spacing={3} direction="row">
        {commandCards
          .sort((a: CommandCard, b: CommandCard) => {
            if (a.pips === b.pips) {
              return a.name < b.name ? -1 : 1;
            }
            return a.pips < b.pips ? -1 : 1;
          })
          .map((commandCard: CommandCard) => (
            <Grid item key={`cc-${commandCard.ldf}`} sm={12} lg={4}>
              <CommandCardCard commandCard={commandCard} />
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
}
