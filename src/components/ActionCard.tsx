const ActionCard = ({
	title,
	description,
	onClick,
}: {
	title: string;
	description: string;
	onClick: () => void;
}) => {
	return (
		<div className="cardContainer">
			<div className="cardsList">
				<div className="cardContent">
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
				<button onClick={onClick}>Ajouter</button>
			</div>
		</div>
	);
};

export default ActionCard;
