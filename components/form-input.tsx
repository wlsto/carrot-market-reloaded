interface IFormInputProps {
	name: string;
	type: string;
	placeholder: string;
	required: boolean;
	errors?: string[];
}

export default function FormInput({ name, type, placeholder, required, errors = [] }: IFormInputProps) {
	return (
		<div className="flex flex-col gap-2">
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				required={required}
				className="w-full h-10 rounded-2xl bg-transparent border-none focus:outline-none placeholder:text-neutral-400 pl-10"
				size={50}
			/>
			{errors?.map((error, index) => (
				<span key={index} className="text-amber-800">
					{error}
				</span>
			))}
		</div>
	);
}
