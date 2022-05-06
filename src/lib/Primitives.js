import { cloneElement, useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { createPortal } from "react-dom";
import cn from "classnames";

// <HashLink to="/#home">Home</HashLink>
// <HashLink to="/#roadmap">Roadmap</HashLink>
// <HashLink to="/#team">Team</HashLink>
export function Navlink({ to, ...props }) {
	return (
		<ScrollLink
			className='hover:text-secondary-500'
			activeClass='text-primary-600'
			spy={true}
			smooth='easeInOutQuint'
			offset={-50}
			duration={500}
			to={to}>
			<button className='uppercase' {...props}></button>
		</ScrollLink>
	);
}

export function Link({ children, ...props }) {
	return (
		<a target='_blank' rel='noreferrer' {...props}>
			{children}
		</a>
	);
}

export function Icon({ children, ...props }) {
	return (
		<div
			className='px-1 py-2 rounded text-white hover:text-secondary-400 transition-colors duration-200 cursor-pointer'
			{...props}>
			{children}
		</div>
	);
}

export function Card({ children, className, ...props }) {
	return (
		<div
			className={cn(
				"bg-black/80 rounded-3xl shadow-lg px-4 py-2 border border-white/20",
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

export function Portal({ children, ...props }) {
	const [portal, setPortal] = useState(null);

	const onClose = () => setPortal(null);

	useEffect(() => {
		const portal = document.createElement("div");
		document.body.appendChild(portal);
		setPortal(portal);
		return () => document.body.removeChild(portal);
	}, []);

	return portal && createPortal(cloneElement(children, { onClose }), portal);
}

export function Modal({ children, onClose, className, ...props }) {
	const [open, setOpen] = useState(true);

	const handleClick = (event) => {
		if (event.target == event.currentTarget) setOpen(false);
	};

	useEffect(() => {
		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = "overlay";
		};
	}, [open]);

	return (
		<Portal>
			<div
				className={cn(
					"flex justify-center items-center fixed left-0 w-screen h-screen top-0 z-20 overflow-hidden",
					"bg-gray-800/40 backdrop-blur-sm blur-xxl",
					"transition-colors duration-500 animate__animated",
					open ? "animate__fadeIn" : "animate__fadeOut",
					className
				)}
				onClick={handleClick}
				onAnimationEnd={() => {
					if (!open) onClose();
				}}
				{...props}>
				<div className='fixed max-w-[1000px] flex items-center overflow-auto'>
					{children}
				</div>
			</div>
		</Portal>
	);
}

export function Button({
	disabled,
	variant = "standard",
	className,
	...props
}) {
	return (
		<button
			disabled={disabled}
			className={cn(
				"rounded-xl px-4 py-2 text-white select-none ",
				"transition-all duration-300 ",
				disabled
					? variant === "text"
						? "text-gray-400"
						: "text-white bg-gray-500 hover:bg-gray-500 "
					: variant === "text"
					? "text-primary-600 hover:text-primary-100"
					: variant === "outlined"
					? "bg-transparent hover:bg-primary-600 outline outline-2 outline-primary-600"
					: variant === "fancy"
					? "bg-gradient-to-br from-primary-600 to-secondary-400 via-primary-600 bg-size-200 bg-pos-0 hover:bg-pos-100"
					: variant === "fancy-border"
					? "bg-gradient-to-br from-primary-600 to-primary-600 via-secondary-500 bg-size-200 bg-pos-0 bg-origin-border shadow-inset shadow-[#3e462e] hover:bg-pos-100 transition-all duration-500 border-2 border-transparent"
					: "bg-primary-600 hover:bg-primary-700 ",
				className
			)}
			{...props}></button>
	);
}

export function Input({
	label,
	value,
	disabled,
	readOnly,
	onChange,
	variant = "standard",
	className,
	children,
	...props
}) {
	readOnly = readOnly || onChange === undefined;
	return (
		<label
			className={`flex flex-col mt-4 w-full text-white ${className ?? ""}`}>
			<span
				className={`text-sm px-1 ${
					disabled ? "text-gray-400" : " text-gray-200"
				}`}>
				{label}
			</span>
			<div
				className={cn(
					"inline-flex group border-gray-400 border-0 rounded-t-md transition-colors duration-500",
					variant === "outlined"
						? "rounded-md border-[1px]"
						: "border-0 border-b-[1px]",
					disabled
						? "border-gray-700 text-gray-500"
						: readOnly
						? "border-gray-700 text-gray-400"
						: "hover:border-gray-100",
					"focus-within:border-primary-600 focus-within:hover:border-primary-600 focus-within:shadow-[0_8px_12px_-14px_white]"
				)}>
				<input
					value={value ?? ""}
					disabled={disabled || readOnly}
					className='outline-none w-full px-1 py-2 mr-auto bg-transparent placeholder-gray-500'
					type='text'
					autoComplete='off'
					name={label}
					onChange={onChange}
					{...props}
				/>
				{children}
			</div>
			{/* <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid email address.</p> */}
		</label>
	);
}

export function LoadingButton({
	loading,
	children,
	className,
	disabled,
	...props
}) {
	return (
		<Button
			className={`flex items-center justify-center transition-all duration-2000 ${
				className ?? ""
			}`}
			disabled={disabled || loading}
			{...props}>
			{loading && (
				<svg
					className={`animate-spin -ml-1 mr-3 my-auto h-5 text-white ${
						loading ? "w-5" : "w-0"
					} `}
					fill='none'
					viewBox='0 0 24 24'>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
				</svg>
			)}
			{children}
		</Button>
	);
}

const InfoIcon = () => (
	<svg className='fill-current w-[22px]' focusable='false' viewBox='0 0 24 24'>
		<path d='M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z'></path>
	</svg>
);

const AlertIcon = () => (
	<svg className='fill-current w-[22px]' focusable='false' viewBox='0 0 24 24'>
		<path d='M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path>
	</svg>
);

const WarningIcon = () => (
	<svg className='fill-current w-[22px]' focusable='false' viewBox='0 0 24 24'>
		<path d='M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z'></path>
	</svg>
);
const SuccessIcon = () => (
	<svg className='fill-current w-[22px]' focusable='false' viewBox='0 0 24 24'>
		<path d='M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z'></path>
	</svg>
);

export function Alert({
	severity = "info",
	children,
	onClose,
	className,
	autoHideDuration = 5000,
	...props
}) {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setOpen(false), autoHideDuration);
		return () => clearTimeout(timer);
	}, []);

	let fillColor, icon;
	if (severity === "info") {
		fillColor = "text-blue-500";
		icon = <InfoIcon />;
	} else if (severity === "success") {
		fillColor = "text-green-500";
		icon = <SuccessIcon />;
	} else if (severity === "warning") {
		fillColor = "text-yellow-500";
		icon = <WarningIcon />;
	} else {
		fillColor = "text-red-500";
		icon = <AlertIcon />;
	}
	return (
		<Portal>
			<div className='fixed bottom-0 my-16 mx-8 z-30'>
				<div
					{...props}
					className={cn(
						"relative px-6 py-4 max-w-lg mt-4 flex rounded text-sm opacity-100 bg-black",
						fillColor,
						"transition-colors duration-500 animate__animated",
						open ? "animate__fadeInUp" : "animate__fadeOutDown",
						className
					)}
					onAnimationEnd={() => {
						if (!open) onClose();
					}}
					{...props}>
					<div className='before:w-full before:h-full before:bg-current before:absolute before:pointer-events-none before:top-0 before:left-0 before:rounded opacity-10'></div>
					<div>{icon}</div>
					<p className='pl-5 pr-5 text-white'>{children}</p>
					<Icon
						className='w-3 h-3 my-auto ml-auto cursor-pointer text-gray-400 hover:text-gray-100'
						onClick={() => {
							setOpen(false);
						}}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
							<path
								className='fill-current'
								d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'
							/>
						</svg>
					</Icon>
					{/* <button className="ml-auto btn-close btn-close-white bg-red-400 w-4 h-4 opacity-75 hover:opacity-100 focus:opacity-100" /> */}
				</div>
			</div>
		</Portal>
	);
}

export function Skeleton(props) {
	return <div className='w-8 h-4 bg-gray-800 rounded animate-pulse'></div>;
}
