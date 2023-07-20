import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import './ActionCard.scoped.css';

const ActionCard = ({
	title,
	description,
	isSelected,
	onAdd,
	onRemove,
}: {
	title: string;
	description: string;
	isSelected: boolean;
	onAdd: () => void;
	onRemove: () => void;
}) => {
	return (
		<article
			className={isSelected ? 'action-card selected' : 'action-card'}
			data-testid="actionCard"
		>
			<div className="grid">
				<details>
					<summary>
						<h2>{title}</h2>
					</summary>
					<p>{description}</p>
				</details>
				<div className="test">
					{isSelected ? (
						<DashCircle
							size={34}
							className="primary button-icon"
							onClick={onRemove}
						/>
					) : (
						<PlusCircle
							size={34}
							className="primary button-icon"
							onClick={onAdd}
						/>
					)}
				</div>
			</div>
		</article>
	);
};

export default ActionCard;
