import { IParticipantChallenge } from "../interfaces/IChallenge";
import { useMutation } from "@apollo/client";
import { createUserToChallenge } from "../graphql/createUserToChallenge";
import { removeUserToChallenge } from "../graphql/removeUserToChallenge";
import { deleteMyChallenge } from "../graphql/deleteMyChallenge";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { IUser } from "../interfaces/IUser";
import { useEffect, useState } from "react";
import { FaTrash, FaShareAlt, FaPencilAlt, FaClock } from "react-icons/fa";

import "./ReadChallenge.css";

const ReadChallenge = (props: {
  challenge: IParticipantChallenge;
  userToChallengeId: number;
  toggleUserStatus: (status: "participant" | "owner" | null) => void;
  userStatus: "participant" | "owner" | null;
  toggleEditableMode: (editable: boolean) => void;
}) => {
  const navigate = useNavigate();
  const challenge = props.challenge;
  const userToChallengeId = props.userToChallengeId;
  const userStatus = props.userStatus;
  const [isCopied, setIsCopied] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [showQuitNotification, setShowQuitNotification] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [
    showDeleteConfirmationDialog,
    setShowDeleteConfirmationDialog,
  ] = useState(false);

  const [
    createUserToChallengeMutation, //{ error: createUserToChallengeError }
  ] = useMutation(createUserToChallenge);

  const [
    removeUserToChallengeMutation, //{ error: removeUserToChallengeError }
  ] = useMutation(removeUserToChallenge);

  const [
    deleteMyChallengeMutation, //{ error: deleteMyChallengeError }
  ] = useMutation(deleteMyChallenge, { refetchQueries: [readMyChallenges] });

  let iconeStyle = { fontSize: "20px", color: "white", margin: "0px 10px" };

  // Question à poser à Aurélien

  function calculateDaysRemaining() {
    if (challenge && challenge.start_date) {
      const today = new Date();

      if (new Date(challenge.end_date) < today) {
        return "Ce challenge est terminé.";
      }

      const challengeStartDate = challenge.start_date
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

  function resetCopiedState() {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function shareChallenge() {
    let url = document.location.href;

    navigator.clipboard.writeText(url).then(
      function() {
        console.log("Copied!");
        setIsCopied(true);
        resetCopiedState();
      },
      function() {
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
      setIsParticipating(true);
      setTimeout(() => {
        setIsParticipating(false);
        setRefreshPage(true);
      }, 4000);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const quitChallenge = async () => {
    console.log("THIS IS userToChallenge :", userToChallengeId);
    setShowConfirmationDialog(true);
  };

  const handleConfirmQuit = async () => {
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

      setShowQuitNotification(true);
      setTimeout(() => {
        setShowQuitNotification(false);
        setRefreshPage(true);
      }, 4000);
    } catch (error) {
      console.log("error from quit challenge:", error);
    } finally {
      setShowConfirmationDialog(false);
    }
  };

  const handleCancelQuit = () => {
    setShowConfirmationDialog(false);
  };

  const ConfirmationDialog = (props: {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    return (
      <dialog open>
        <article className="dialog">
          <p>{props.message}</p>
          <div className="dialog-buttons">
            <button onClick={props.onCancel} className="secondary">
              Annuler
            </button>
            <button onClick={props.onConfirm}>Confirmer</button>
          </div>
        </article>
      </dialog>
    );
  };

  const deleteChallenge = async () => {
    setShowDeleteConfirmationDialog(true);
  };

  const handleConfirmDelete = async () => {
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
    } finally {
      setShowDeleteConfirmationDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmationDialog(false);
  };

  useEffect(() => {
    if (refreshPage) {
      window.location.reload();
    }
  }, [refreshPage]);

  return (
    <div className="challengeInfoContainer">
      <section>
        <h2>{challenge.name}</h2>
        <div className="infosPara startDate">
          <p>Date de début :</p>
          <p>{format(new Date(challenge.start_date), "yyyy-MM-dd")}</p>
        </div>
        <div className="infosPara length">
          <p>Durée :</p>
          <p>{challenge.length}</p>
        </div>
        <div className="infosPara createdBy">
          <p>Créé par :</p>
          <p>{challenge.createdBy.name}</p>
        </div>
        <hr className="separator" />

        <div className="participantsContainer">
          <h4>Participants:</h4>
          <ul>
            {challenge.userToChallenges.map((participant: { user: IUser }) => (
              <li key={participant.user.id}>
                <p>{participant.user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="btnContainer">
        <button onClick={shareChallenge} className="challengeBtn">
          <FaShareAlt style={iconeStyle} />
          Partager
        </button>
        {isCopied && (
          <article className="alert alert-popup">
            <p>Le lien a été copié avec succès !</p>
          </article>
        )}

        {isParticipating && (
          <article className="alert alert-popup">
            <p>
              🌱 Bravo ! Votre participation au challenge est confirmée. <br />
              Ensemble, faisons la différence pour notre planète ! 🌍
            </p>
          </article>
        )}

        {userStatus === null ? (
          <button onClick={participateToChallenge}>Je participe !</button>
        ) : userStatus === "owner" ? (
          <>
            {props.challenge.is_in_progress === false && (
              <button
                className="challengeBtn"
                onClick={() => {
                  props.toggleEditableMode(true);
                }}
              >
                <FaPencilAlt style={iconeStyle} />
                Modifier
              </button>
            )}
            <button onClick={deleteChallenge} className="challengeBtn">
              <FaTrash style={iconeStyle} />
              Supprimer
            </button>
          </>
        ) : (
          <>
            <button onClick={quitChallenge}>Quitter le challenge</button>
            {showQuitNotification && (
              <article className="yellow alert-popup">
                <p>
                  😞 Oh! tu quittes le challenge.
                  <br /> Votre éco-aventure continue, n'oubliez pas que vous
                  avez déjà planté
                  <br />
                  des graines écologiques dans nos cœurs.
                  <br /> A très vite Epikopain(e) ! 🌿
                </p>
              </article>
            )}
            {showConfirmationDialog && (
              <ConfirmationDialog
                message="Êtes-vous sûr de vouloir quitter le challenge ?"
                onConfirm={handleConfirmQuit}
                onCancel={handleCancelQuit}
              />
            )}
          </>
        )}

        {showDeleteConfirmationDialog && (
          <ConfirmationDialog
            message="Êtes-vous sûr de vouloir supprimer le challenge ?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>

      <hr className="separator" />
      <FaClock style={iconeStyle} />
      <p className="whenStartGame">{calculateDaysRemaining()}</p>
    </div>
  );
};

export default ReadChallenge;
