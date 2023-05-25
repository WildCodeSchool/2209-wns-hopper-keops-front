import React, { useEffect, useMemo, useState } from "react";
import { IAction } from "../interfaces/IAction";
import { IChallenge } from "../interfaces/IChallenge";
import { createSuccess } from "../graphql/createSuccess";
import { useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { readMyChallengeSuccesses } from "../graphql/readMyChallengeSuccess";
import { log } from "console";

interface ISuccess {
  id: string;
  date: string;
  action: {
    id: number;
  };
}

const ActionTile = (props: { action: IAction; challenge: IChallenge }) => {
  const startDate = new Date(props.challenge.start_date);
  const actionId = props.action.id;
  const challengeId = props.challenge.id;

  const [createSuccessMutation, { error }] = useMutation(createSuccess, {
    refetchQueries: [readMyChallengeSuccesses],
  });

  const { data } = useQuery<{ readMyChallengeSuccesses: ISuccess[] }>(
    readMyChallengeSuccesses,
    {
      variables: {
        challengeId: props.challenge.id,
      },
    }
  );

  const [successesKeys, setSuccessesKeys] = useState<string[]>([]);

  useEffect(() => {
    const keys: string[] = [];

    if (data?.readMyChallengeSuccesses) {
      for (const success of data.readMyChallengeSuccesses as ISuccess[]) {
        const successDate = new Date(success.date);

        keys.push(`${format(successDate, "yyyy-MM-dd")}-${success.action.id}`);
      }
    }

    setSuccessesKeys(keys);
  }, [data]);

  const isChecked = (i: number, actionId: string): boolean => {
    const key = `${format(addDays(startDate, i), "yyyy-MM-dd")}-${actionId}`;
    console.log(key, JSON.stringify(successesKeys), successesKeys);
    if (successesKeys.includes(key)) {
      console.log("youpi");
    }
    return successesKeys.includes(key);
  };

  async function validateSuccess(i: number) {
    try {
      await createSuccessMutation({
        variables: {
          data: {
            action: {
              id: actionId,
            },
            challenge: {
              id: challengeId,
            },
            date: format(addDays(startDate, i), "yyyy-MM-dd"),
          },
        },
      });
      console.log("Success with createSuccessMutation");
    } catch {
      console.log("Error with createSuccessMutation");
    }
  }

  const checkboxes = useMemo(() => {
    const newCheckboxes = [];
    console.log("nous calculons les checkboxes", JSON.stringify(successesKeys));
    for (let i = 0; i < props.challenge.length; i++) {
      newCheckboxes.push(
        <div key={i}>
          Jour {i + 1} :{" "}
          <input
            type="checkbox"
            onClick={(e) => validateSuccess(i)} // e.target.ckecked pour savoir si on a coché ou décoché la case
            checked={isChecked(i, actionId)}
          />
        </div>
      );
    }

    return newCheckboxes;
  }, [successesKeys]);

  return (
    <li key={props.action.id}>
      <h6>{props.action.title}</h6>
      <div>{checkboxes}</div>
    </li>
  );
};

export default ActionTile;
