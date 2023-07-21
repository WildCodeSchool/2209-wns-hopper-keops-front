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
import ChallengeLeaderboardPage from "./ChallengeLeaderboardPage";
import ChallengeNavigation from "../components/ChallengeNavigation";

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

  const [alert, setAlert] = useState(false);

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

  useEffect(() => {
    if (alert === true) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (challenge === null) {
    return <Navigate to={"/dashboard"} replace={true} />;
  } else if (challenge !== undefined && challenge !== null) {
    return (
      <>
        <article>
          {!editableMode && !editableActionsMode && <ChallengeNavigation />}
          {view === "infos" ? (
            <>
              {editableMode ? (
                <UpdateChallenge
                  challenge={challenge}
                  toggleEditableMode={() => setEditableMode(false)}
                  toggleEditableModeAndAlert={() => {
                    setEditableMode(false);
                    setAlert(true);
                  }}
                />
              ) : (
                <>
                  <ReadChallenge
                    challenge={challenge}
                    userToChallengeId={Number(userToChallengeId)}
                    toggleUserStatus={setUserStatus}
                    toggleEditableMode={setEditableMode}
                    userStatus={userStatus}
                  />
                </>
              )}
            </>
          ) : view === "tasks" ? (
            <>
              {editableActionsMode === false ? (
                <>
                  <ActionsList
                    challenge={challenge}
                    userStatus={userStatus}
                    toggleEditableActionsMode={() =>
                      setEditableActionsMode(true)
                    }
                  />
                </>
              ) : (
                <UpdateActionsChallenge
                  challenge={challenge}
                  toggleEditableActionsMode={() =>
                    setEditableActionsMode(false)
                  }
                  toggleEditableActionsModeAndAlert={() => {
                    setEditableActionsMode(false);
                    setAlert(true);
                  }}
                />
              )}
            </>
          ) : view === "leaderboard" ? (
            <>
              <ChallengeLeaderboardPage />
            </>
          ) : (
            <Navigate to={"/dashboard"} replace={true} />
          )}
        </article>
        {alert && (
          <article className="alert alert-popup">
            <p>✅ Les modifications ont bien été enregistrées.</p>
          </article>
        )}
      </>
    );
  } else {
    return (
      <article aria-busy="true" className="container-loading">
        Chargement...
      </article>
    );
  }
};

export default ChallengePage;
