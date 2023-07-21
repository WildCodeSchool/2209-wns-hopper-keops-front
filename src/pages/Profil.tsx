/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthProvider";
import { useMutation } from "@apollo/client";
import { editUser } from "../graphql/editUser";
import { FaPencilAlt } from "react-icons/fa";
import { ArrowLeft, Save2 } from "react-bootstrap-icons";
import "./Profil.scoped.css";

const Profil = () => {
  const user = useUser();
  const [isEdited, setIsEdited] = useState(false);
  const [pseudo, setPseudo] = useState<string>(user.name);
  const [alert, setAlert] = useState(false);
  const [editUserMutation] = useMutation(editUser);

  const editPseudo = () => {
    setIsEdited(!isEdited);
  };

  const sendNewPseudo = async () => {
    try {
      await editUserMutation({
        variables: {
          data: {
            name: pseudo,
          },
        },
      });
      console.log("Pseudo edited!");
      setIsEdited(false);
      setAlert(true);
    } catch (error) {
      console.log("Error with pseudo edit:", error);
    }
  };

  useEffect(() => {
    if (alert === true) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <article>
      <h1 className="title">Profil</h1>
      <p className="email">Email: {user.email}</p>
      <p>
        Pseudo:{" "}
        {isEdited ? (
          <div>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
        ) : (
          user.name
        )}
      </p>
      {isEdited ? (
        <div className="button-container-multiple">
          <button onClick={sendNewPseudo}>
            <Save2 className="icone-btn" />
            <span className="text-btn">Valider</span>
          </button>
          <button onClick={editPseudo} className="outline">
            <ArrowLeft className="icone-btn" />
            <span className="text-btn">Annuler</span>
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={editPseudo}>
            <FaPencilAlt className="icone-btn" />
            <span className="text-btn">Modifier pseudo</span>
          </button>
        </div>
      )}
      {alert && (
        <article className="alert alert-popup">
          <p>Pseudo modifié avec succès.</p>
        </article>
      )}
    </article>
  );
};

export default Profil;
