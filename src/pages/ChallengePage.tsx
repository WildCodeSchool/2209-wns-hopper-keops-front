import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { IUser } from "../interfaces/IUser";
import { IAction } from "../interfaces/IAction";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { Navigate, useParams } from "react-router-dom";

import format from "date-fns/format";
import { createUserToChallenge } from "../graphql/createUserToChallenge";
import { UserContext } from "../context/AuthProvider";
import { removeUserToChallenge } from "../graphql/removeUserToChallenge";
import { deleteMyChallenge } from "../graphql/deleteMyChallenge";
import { useNavigate } from "react-router-dom";
import { readMyChallenges } from "../graphql/readMyChallenges";
import ActionsList from "../components/ActionsList";

const ChallengePage = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const { challengeId } = useParams();

  const [challenge, setChallenge] = useState<
    null | IParticipantChallenge | undefined
  >(undefined);

  const [userStatus, setUserStatus] = useState<null | "participant" | "owner">(
    null
  );

  const [userToChallengeId, setUserToChallengeId] = useState<string>("");

  const [createUserToChallengeMutation, { error: createUserToChallengeError }] =
    useMutation(createUserToChallenge);

  const [removeUserToChallengeMutation, { error: removeUserToChallengeError }] =
    useMutation(removeUserToChallenge);

  const [deleteMyChallengeMutation, { error: deleteMyChallengeError }] =
    useMutation(deleteMyChallenge, { refetchQueries: [readMyChallenges] });

  const { data } = useQuery<{ readOneChallenge: IParticipantChallenge }>(
    readOneChallenge,
    {
      variables: {
        challengeId,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setChallenge(data?.readOneChallenge);
    }
    console.log("DATA users:", data);

    data?.readOneChallenge.userToChallenges.map((userToChallenge) => {
      const userId = userToChallenge.user.id;

      if (userId === user?.id) {
        setUserStatus("participant");
        setUserToChallengeId(userToChallenge.id);

        console.log("UserToChallengeId:", userToChallengeId);

        if (data.readOneChallenge.createdBy.id === user?.id) {
          setUserStatus("owner");
        }
      }
      console.log("User Status:", userStatus);
    });
  }, [data, user?.id, userStatus]);

  function shareChallenge() {
    let url = document.location.href;

    navigator.clipboard.writeText(url).then(
      function () {
        console.log("Copied!");
      },
      function () {
        console.log("Copy error");
      }
    );
  }

  const participateToChallenge = async () => {
    try {
      await createUserToChallengeMutation({
        variables: {
          isAccepted: true,
          challengeId,
        },
      });

      console.log("Participation OK");
      setUserStatus("participant");
    } catch (error) {
      console.log("error :", error);
    }
  };

  const quitChallenge = async () => {
    console.log("THIS IS userToChallenge :", userToChallengeId);
    try {
      await removeUserToChallengeMutation({
        variables: {
          data: {
            userToChallengeId,
          },
        },
      });

      console.log("Quit the challenge");
    } catch (error) {
      console.log("error from quit challenge:", error);
    }
  };

  const deleteChallenge = async () => {
    try {
      await deleteMyChallengeMutation({
        variables: {
          challengeId,
        },
      });
      console.log("Challenge removed !");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("error :", error);
    }
  };

  if (challenge === null) {
    return <Navigate to={"/dashboard"} replace={true} />;
  } else if (challenge !== undefined && challenge !== null) {
    return (
      <div>
        <h2>{challenge.name}</h2>
        {
          <p>
            Date de début:{" "}
            {format(new Date(challenge.start_date), "yyyy-MM-dd")}
          </p>
        }
        <p>Durée : {challenge.length}</p>
        <p>Créé par : {challenge.createdBy.id}</p>

        <button onClick={shareChallenge}>Partager ce challenge</button>

        {userStatus === null ? (
          <button onClick={participateToChallenge}>Je participe !</button>
        ) : userStatus === "owner" ? (
          <button onClick={deleteChallenge}>Supprimer le challenge</button>
        ) : (
          <button onClick={quitChallenge}>Quitter le challenge</button>
        )}

        <h4>Participants:</h4>
        <li>
          {challenge.userToChallenges.map((participant: { user: IUser }) => {
            return <p key={participant.user.id}>{participant.user.name}</p>;
          })}
        </li>
        <ActionsList challenge={challenge} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ChallengePage;
