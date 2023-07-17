import { Link } from "react-router-dom";
import "./ChallengeCard.scoped.css";
import { ArrowRightCircle } from "react-bootstrap-icons";

const ChallengeCard = ({
  id,
  name,
  start_date,
}: {
  id: string;
  name: string;
  start_date: Date;
}) => {
  return (
    <article className="grid">
      <div className="infos">
        <h3 className="title">{name}</h3>
        <p>Infos sur le challenge</p>
        {/* <p>{format(start_date, 'yyyy-MM-dd')}</p> */}
      </div>
      <div className="actions">
        <Link to={`/challenges/${id}`}>
          <ArrowRightCircle size={28} />
        </Link>
      </div>
    </article>
  );
};

export default ChallengeCard;
