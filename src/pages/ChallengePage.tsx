import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthProvider";
import UpdateChallenge from "../components/UpdateChallenge";
import ReadChallenge from "../components/ReadChallenge";

const ChallengePage = () => {
  const user = useContext(UserContext);
  const { challengeId } = useParams();

  const [userStatus, setUserStatus] = useState<null | "participant" | "owner">(
    null
  );

  let status = null;

  let initialEditableMode = false;

  const [userToChallengeId, setUserToChallengeId] = useState<string>("");

  const [editableMode, setEditableMode] = useState<Boolean>(false);

  const [challenge, setChallenge] = useState<
    null | IParticipantChallenge | undefined
  >(undefined);

  const { data } = useQuery<{ readOneChallenge: IParticipantChallenge }>(
    readOneChallenge,
    {
      variables: {
        challengeId,
      },
    }
  );

  const toggleUserStatus = (status: "participant" | "owner" | null): void => {
    setUserStatus(status);
  };

  useEffect(() => {
    if (data) {
      setChallenge(data?.readOneChallenge);
      for (const userToChallenge of data.readOneChallenge.userToChallenges) {
        const userId = userToChallenge.user.id;

        if (userId === user?.id) {
          setUserStatus("participant");
          setUserToChallengeId(userToChallenge.id);

          if (data.readOneChallenge.createdBy.id === user?.id) {
            setUserStatus("owner");
          }
        }
      }
    }
  }, [data, user?.id, userStatus, userToChallengeId]);

  if (challenge === null) {
    return <Navigate to={"/dashboard"} replace={true} />;
  } else if (challenge !== undefined && challenge !== null) {
    return (
      <div>
        {editableMode === false ? (
          <ReadChallenge
            challenge={challenge}
            userToChallengeId={Number(userToChallengeId)}
            toggleUserStatus={toggleUserStatus(status)}
            toggleEditableMode={toggleEditableMode(initialEditableMode)}
            userStatus={userStatus}
          />
        ) : (
          <UpdateChallenge challenge={challenge} />
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ChallengePage;
