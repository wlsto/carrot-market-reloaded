"use client";

import { useFormStatus } from "react-dom";

interface IFormButtonProps {
	text: string;
}

export default function FormButton({ text }: IFormButtonProps) {
	// useFormStatus : react hook
	// form 자체에 해당 속성을 적용할 수는 없음
	// form의 자식 요소에서만 사용가능
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			className="primary-btn disabled:bg-neutral-400 disabled:text-neutral-500 disabled:cursor-not-allowed"
		>
			{pending ? "Loading..." : text}
		</button>
	);
}
