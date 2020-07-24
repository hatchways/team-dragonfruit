import React from "react";
import WithBackground from "../hocs/withBackground";

import Onboarding from "../components/Onboarding";
import Notification from "../utils/Notification";

const OnboardingPage = () => {
	return (
		<WithBackground>
			<Onboarding />
			<Notification />
		</WithBackground>
	);
};

export default OnboardingPage;
