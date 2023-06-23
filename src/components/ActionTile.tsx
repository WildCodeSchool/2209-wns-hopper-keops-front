import React, { useEffect, useMemo, useState } from "react";
import { IAction } from "../interfaces/IAction";
import { IChallenge } from "../interfaces/IChallenge";
import { createSuccess } from "../graphql/createSuccess";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { readMyChallengeSuccesses } from "../graphql/readMyChallengeSuccess";
import { deleteMySuccess } from "../graphql/deleteMySuccess";
import { ISuccess } from "../interfaces/ISuccess";
import "./ActionTile.scoped.css";
import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";

const ActionTile = (props: { action: IAction; challenge: IChallenge }) => {
  const startDate = new Date(props.challenge.start_date);
  const actionId = props.action.id;
  const challengeId = props.challenge.id;

  const { data } = useQuery<{ readMyChallengeSuccesses: ISuccess[] }>(
    readMyChallengeSuccesses,
    {
      variables: {
        challengeId: props.challenge.id,
      },
    }
  );

  // TODO refetch readChallengerLeaderboard (score)
  const {data : particpant} = useQuery<any>(readChallengeLeaderboard, {
    variables: { challengeId },
  });
  

  // useEffect(() => {
  //   console.log("Participant! :", participant)
  // }, [participant])

  const [createSuccessMutation] = useMutation(createSuccess, {
    refetchQueries: [readMyChallengeSuccesses, readChallengeLeaderboard]
  });

  const [
    deleteMySuccessMutation,
  ] = useMutation(deleteMySuccess, { 
    refetchQueries: [readMyChallengeSuccesses, readChallengeLeaderboard] 
  });

  

  const [successesMap, setSuccessesMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const keys: any = {};

    if (data?.readMyChallengeSuccesses) {
      for (const success of data.readMyChallengeSuccesses as ISuccess[]) {
        const successDate = new Date(success.date);

        keys[`${format(successDate, "yyyy-MM-dd")}-${success.action.id}`] = success.id;
      }
    }
    setSuccessesMap(keys);
  }, [data]);

  const isChecked = (i: number, actionId: string): boolean => {
    const key = `${format(addDays(startDate, i), "yyyy-MM-dd")}-${actionId}`;
    return key in successesMap;
  };

  async function validateSuccess(e: React.MouseEvent<HTMLInputElement, MouseEvent>, i: number) {
    const target = e.target as HTMLInputElement; 
    // addDays est une fonction de format/date-fns
    const successDate = format(addDays(startDate, i), "yyyy-MM-dd");
    const successKey = `${successDate}-${actionId}`;
 
    if (target.checked) {
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
        console.log("Success create !");
      } catch {
        console.log("Error with success create");
      }
    } else {
      try {
        await deleteMySuccessMutation({
          variables: {
            data: {
              id: successesMap[successKey],
            }
          },
        });
        console.log("Success removed !");
      } catch (error) {
        console.log("error with success removed:", error);
      }
    }
  }

  function isDisabled(i: number): boolean {
    const dateToday = format(new Date(), "yyyy-MM-dd");
    const succesDate = format(addDays(startDate, i), "yyyy-MM-dd");
    if (dateToday >= succesDate) {
      return false;
    } else {
      return true;
    }
  }

  const checkboxes = useMemo(() => {
    const newCheckboxes = [];
    for (let i = 0; i < props.challenge.length; i++) {
      newCheckboxes.push(
        <div key={i} className="checkbox-card">
          J{i + 1}
          <input
            type="checkbox"
            onClick={(e) => validateSuccess(e, i)}
            checked={isChecked(i, actionId)}
            disabled={isDisabled(i)}
          />
        </div>
      );
    }
    return newCheckboxes;
  }, [successesMap, props.challenge]);

  return (
    <li key={props.action.id}>
      <h6>{props.action.title}</h6>
      <div className="cards-wrapper">{checkboxes}</div>
    </li>
  );
};

export default ActionTile;
