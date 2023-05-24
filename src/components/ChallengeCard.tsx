import { Link } from "react-router-dom";

const ChallengeCard = ({
  id,
  name,
  start_date,
  onClick,
}: {
  id: string;
  name: string;
  start_date: Date;
  onClick: () => void;
}) => {
  return (
    <div className="cardContainer">
      <div className="cardsList">
        <div className="cardContent">
          <h2>{name}</h2>
          {/* <p>{format(start_date, 'yyyy-MM-dd')}</p> */}
        </div>
        <Link to={`/challenges/${id}`}>
          <button>Plus d'info</button>
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
