/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useUser } from '../context/AuthProvider';
import { useMutation } from '@apollo/client';
import { editUser } from '../graphql/editUser';
import "./Profil.css";



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
      console.log('Pseudo edited!');
      setIsEdited(false);
      setAlert(true);
    } catch (error) {
      console.log('Error with pseudo edit:', error);
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
    <div>
      <h1 className="title">Profil</h1>
      <p className="email">Email: {user.email}</p>
      <p>
        Pseudo:{' '}
        {isEdited ? (
          <div>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <button onClick={sendNewPseudo}>Valider</button>
          </div>
        ) : (
          user.name
        )}
      </p>
      <button onClick={editPseudo}>
        {isEdited ? 'Annuler' : 'Modifier pseudo'}
      </button>
      {alert && (
        <article className="alert alert-popup">
          <p>Pseudo modifié avec succès.</p>
        </article>
      )}
    </div>
  );
};

export default Profil;
