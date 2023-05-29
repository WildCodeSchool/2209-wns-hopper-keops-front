import { IParticipantChallenge } from "../interfaces/IChallenge";
import { useMutation } from "@apollo/client";
import { createUserToChallenge } from "../graphql/createUserToChallenge";
import { removeUserToChallenge } from "../graphql/removeUserToChallenge";
import { deleteMyChallenge } from "../graphql/deleteMyChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { IUser } from "../interfaces/IUser";

const ReadChallenge = (props: {
  challenge: IParticipantChallenge;
  userToChallengeId: number;
  toggleUserStatus: void;
  userStatus: "participant" | "owner" | null;
  toggleEditableMode: boolean;
}) => {
  const navigate = useNavigate();
  const challenge = props.challenge;
  const userToChallengeId = props.userToChallengeId;
  const userStatus = props.userStatus;

  const [
    createUserToChallengeMutation, //{ error: createUserToChallengeError }
  ] = useMutation(createUserToChallenge);

  const [
    removeUserToChallengeMutation, //{ error: removeUserToChallengeError }
  ] = useMutation(removeUserToChallenge);

  const [
    deleteMyChallengeMutation, //{ error: deleteMyChallengeError }
  ] = useMutation(deleteMyChallenge, { refetchQueries: [readMyChallenges] });

  // Question à poser à Aurélien

  function calculateDaysRemaining() {
    if (challenge != null) {
      const today = new Date();

      if (new Date(challenge.end_date) < today) {
        return "Ce challenge est terminé.";
      }

      const challengeStartDate = challenge?.start_date
        ? new Date(challenge.start_date)
        : undefined;

      if (challengeStartDate) {
        // Calcul en millisecondes entre aujourd'hui et la date de début du challenge
        const timeDiff = challengeStartDate.getTime() - today.getTime();

        // Calcul du nombre de jours restants (1000 = nombre de millisecondes dans une seconde, 3600 secondes dans une heure)
        const milisecondInADay = 1000 * 3600 * 24;
        // Math.ceil arrondi à l'entier supérieur
        const daysRemaining = Math.ceil(timeDiff / milisecondInADay);

        if (daysRemaining === 0) {
          return "Le challenge est en cours !";
        } else {
          return `Patience ! Le challenge commence dans ${daysRemaining} jours`;
        }
      }
    } else {
      console.log("La date de début du challenge est manquante.");
    }
  }

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
          challengeId: challenge.id,
        },
      });

      console.log("Participation OK");

      props.toggleUserStatus("participant");
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
      props.toggleUserStatus(null);

      console.log("Quit the challenge");
    } catch (error) {
      console.log("error from quit challenge:", error);
    }
  };

  const deleteChallenge = async () => {
    try {
      await deleteMyChallengeMutation({
        variables: {
          challengeId: challenge.id,
        },
      });
      console.log("Challenge removed !");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div>
      <h2>{challenge.name}</h2>
      <p>
        Date de début: {format(new Date(challenge.start_date), "yyyy-MM-dd")}
      </p>
      <p>Durée : {challenge.length}</p>
      <p>Créé par : {challenge.createdBy.id}</p>

      <button onClick={shareChallenge}>Partager ce challenge</button>

      {userStatus === null ? (
        <button onClick={participateToChallenge}>Je participe !</button>
      ) : userStatus === "owner" ? (
        <>
          <button onClick={deleteChallenge}>Supprimer le challenge</button>
          <button
            onClick={() => {
              props.toggleEditableMode(true);
            }}
          >
            Modifier le challenge
          </button>
        </>
      ) : (
        <button onClick={quitChallenge}>Quitter le challenge</button>
      )}

      <h4>Participants:</h4>
      <li>
        {challenge.userToChallenges.map((participant: { user: IUser }) => {
          return <p key={participant.user.id}>{participant.user.name}</p>;
        })}
      </li>

      {calculateDaysRemaining()}
      {/* <ActionsList challenge={challenge} /> */}
    </div>
  );
};

export default ReadChallenge;
