import { InputHTMLAttributes } from "react";

interface IFormInputProps {
	name: string;
	errors?: string[];
}

export default function FormInput({
	name,
	errors = [],
	...rest
}: IFormInputProps & InputHTMLAttributes<HTMLInputElement>) {
	console.log("errors", errors);
	return (
		<>
			<input
				name={name}
				className={`${errors.length === 0 ? "primary-input" : "invalid_input"}`}
				size={50}
				{...rest}
			/>
			{errors.map((error, index) => (
				<span key={index} className="text-amber-800">
					{error}
				</span>
			))}
		</>
	);
}
