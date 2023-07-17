import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthProvider";
import UpdateChallenge from "../components/UpdateChallenge";
import ReadChallenge from "../components/ReadChallenge";
import ActionsList from "../components/ActionsList";
import UpdateActionsChallenge from "../components/UpdateActionsChallenge";
import { Link } from "react-router-dom";
import ChallengeLeaderboardPage from "./ChallengeLeaderboardPage";

const ChallengePage = () => {
  const user = useContext(UserContext);
  const { challengeId, view } = useParams();

  const [userStatus, setUserStatus] = useState<null | "participant" | "owner">(
    null
  );
  const [userToChallengeId, setUserToChallengeId] = useState<string>("");
  const [editableMode, setEditableMode] = useState<Boolean>(false);
  const [editableActionsMode, setEditableActionsMode] = useState<Boolean>(
    false
  );
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

  useEffect(() => {
    if (data && data.readOneChallenge) {
      setChallenge(data.readOneChallenge);
      for (const userToChallenge of data.readOneChallenge.userToChallenges) {
        const userId = userToChallenge.user.id;

        if (user && user.id && userId === user.id) {
          setUserStatus("participant");
          setUserToChallengeId(userToChallenge.id);

          if (data.readOneChallenge.createdBy.id === user.id) {
            setUserStatus("owner");
          }
        }
      }
    }
  }, [data, user, userStatus, userToChallengeId]);

  if (challenge === null) {
    return <Navigate to={"/dashboard"} replace={true} />;
  } else if (challenge !== undefined && challenge !== null) {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="../infos" relative="path" role="button">
                infos
              </Link>
            </li>
            <li>
              <Link to="../tasks" relative="path" role="button">
                taches
              </Link>
            </li>
            <li>
              <Link to="../leaderboard" relative="path" role="button">
                classement
              </Link>
            </li>
          </ul>
        </nav>
        {view === "infos" ? (
          <>
            {editableMode ? (
              <UpdateChallenge
                challenge={challenge}
                toggleEditableMode={() => setEditableMode(false)}
              />
            ) : (
              <ReadChallenge
                challenge={challenge}
                userToChallengeId={Number(userToChallengeId)}
                toggleUserStatus={setUserStatus}
                toggleEditableMode={setEditableMode}
                userStatus={userStatus}
              />
            )}
          </>
        ) : view === "tasks" ? (
          <>
            {editableActionsMode === false ? (
              <ActionsList
                challenge={challenge}
                userStatus={userStatus}
                toggleEditableActionsMode={() => setEditableActionsMode(true)}
              />
            ) : (
              <UpdateActionsChallenge
                challenge={challenge}
                toggleEditableActionsMode={() => setEditableActionsMode(false)}
              />
            )}
          </>
        ) : view === "leaderboard" ? (
          <ChallengeLeaderboardPage />
        ) : (
          <Navigate to={"/dashboard"} replace={true} />
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ChallengePage;
