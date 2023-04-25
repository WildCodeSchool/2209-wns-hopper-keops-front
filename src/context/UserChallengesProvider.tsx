// import React, { createContext, useState } from 'react';
// import { IUserChallenge } from '../interfaces/IUserChallenge';

// interface UserChallengesContextProps {
// 	userChallenges: IUserChallenge;
// 	setUserChallenges: React.Dispatch<React.SetStateAction<IUserChallenge>>;
// }

// export const UserChallengesContext = createContext<UserChallengesContextProps>({
// 	userChallenges: {} as IUserChallenge,
// 	setUserChallenges: () => {},
// });

// const UserChallengesProvider = (props: { children: React.ReactNode }) => {
// 	const [userChallenges, setUserChallenges] = useState<IUserChallenge>(
// 		{} as IUserChallenge,
// 	);

// 	return (
// 		<UserChallengesContext.Provider
// 			value={{ userChallenges, setUserChallenges }}
// 		>
// 			{props.children}
// 		</UserChallengesContext.Provider>
// 	);
// };

// export default UserChallengesProvider;
export {};
