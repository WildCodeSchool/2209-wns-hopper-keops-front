import React, { useEffect, useMemo, useState } from "react";
import { IAction } from "../interfaces/IAction";
import { IChallenge } from "../interfaces/IChallenge";
import { createSuccess } from "../graphql/createSuccess";
import { useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { readMyChallengeSuccesses } from "../graphql/readMyChallengeSuccess";
import { deleteMySuccess } from "../graphql/deleteMySuccess";
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

  const [
    deleteMySuccessMutation, //{ error: deleteMyChallengeError }
  ] = useMutation(deleteMySuccess, { 
    refetchQueries: [readMyChallengeSuccesses] 
  });

  const { data } = useQuery<{ readMyChallengeSuccesses: ISuccess[] }>(
    readMyChallengeSuccesses,
    {
      variables: {
        challengeId: props.challenge.id,
      },
    }
  );

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
    console.log(successesMap);
  }, [data]);

  const isChecked = (i: number, actionId: string): boolean => {
    const key = `${format(addDays(startDate, i), "yyyy-MM-dd")}-${actionId}`;
    // objet key value =! tableau
    // 
    console.log(key, JSON.stringify(successesMap), successesMap);
    // if (successesMap.includes(key)) {
    //   console.log("youpi");
    // }
    return key in successesMap;
  };

  async function validateSuccess(e: React.MouseEvent<HTMLInputElement, MouseEvent>, i: number) {
    const target = e.target as HTMLInputElement; 
    const successDate = format(addDays(startDate, i), "yyyy-MM-dd");
    const successKey = `${successDate}-${actionId}`;
    console.log("Console de sucessKey: ",successKey);
    console.log("Ceci est notre console.log: ",successesMap[successKey]);
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
        console.log("Success with createSuccessMutation");
      } catch {
        console.log("Error with createSuccessMutation");
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
        console.log("error :", error);
      }
    }
  }

  const checkboxes = useMemo(() => {
    const newCheckboxes = [];
    for (let i = 0; i < props.challenge.length; i++) {
      newCheckboxes.push(
        <div key={i}>
          Jour {i + 1} :{" "}
          <input
            type="checkbox"
            onClick={(e) => validateSuccess(e, i)} // e.target.ckecked pour savoir si on a coché ou décoché la case
            checked={isChecked(i, actionId)}
          />
        </div>
      );
    }

    return newCheckboxes;
  }, [successesMap]);

  return (
    <li key={props.action.id}>
      <h6>{props.action.title}</h6>
      <div>{checkboxes}</div>
    </li>
  );
};

export default ActionTile;
