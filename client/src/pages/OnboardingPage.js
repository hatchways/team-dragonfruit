import React from "react";
import WithBackground from "../hocs/withBackground";

import Onboarding from "../components/Onboarding";
import NewOnboard from "../components/NewOnboarding";

const OnboardingPage = () => {
	return (
		<WithBackground>
			<NewOnboard />
		</WithBackground>
	);
};

export default OnboardingPage;
