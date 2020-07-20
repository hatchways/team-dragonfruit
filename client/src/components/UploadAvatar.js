import axios from "axios";
import React from "react";

const UploadAvatar = () => {

	const handleSubmitAvatar = () => {
		
	}
	return (
		<div>
			Upload your photo:
			<form>
				<input type="file" id="myFile" name="filename" />
				<input type="submit" onClick={handleSubmitAvatar} />
			</form>
		</div>
	);
};

export default UploadAvatar;
