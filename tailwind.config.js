const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {
			transitionProperty: {
				width: "width",
				height: "height",
			},
			width: (theme) => ({
				"screen/2": "50vw",
				"screen/3": "calc(100vw / 3)",
				"screen/4": "calc(100vw / 4)",
				"screen/5": "calc(100vw / 5)",
			}),
			height: (theme) => ({
				"screen/2": "50vh",
				"screen/3": "calc(100vh / 3)",
				"screen/4": "calc(100vh / 4)",
				"screen/5": "calc(100vh / 5)",
			}),
			screens: {
				500: "500px",
				550: "550px",
				800: "800px",
				900: "900px",
				1100: "1100px",
			},
			backgroundSize: {
				"size-200": "200% 200%",
				"size-100": "100% 100%",
			},
			backgroundPosition: {
				"pos-0": "0% 0%",
				"pos-100": "100% 100%",
			},
			boxShadow: {
				inset: "5px 1000px 1px #fff inset",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				background: "url('./assets/images/cool-background.png')",
			},
			colors: {
				base: "#041C32",
				light: "#f2efe6",
				baseBlue: "#1e50ff",
				basePink: "#d41efc",
			},
			fontFamily: {
				retro: ["Retro Gaming"],
				"04b": ['"04b-30"'],
			},
			animation: {
				none: "none",
				spin: "spin 1s linear infinite",
				ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				bounce: "bounce 1s infinite",
				float: "float 3s infinite",
				refloat: "refloat 3s infinite",
				"gradient-x": "gradient-x 7s ease infinite",
				glow: "glow 3s linear infinite",
				flip: "flip 1.2s ease-in-out",
			},
			keyframes: {
				spin: {
					to: { transform: "rotate(360deg)" },
				},
				ping: {
					"75%, 100%": { transform: "scale(2)", opacity: "0" },
				},
				pulse: {
					"50%": { opacity: ".5" },
				},
				bounce: {
					"0%, 100%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "none",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
				},
				float: {
					"0%": {
						transform: "translateY(0px)",
						animationTimingFunction: "ease-in-out",
					},
					"50%": {
						transform: "translateY(-15px)",
						animationTimingFunction: "ease-in-out",
					},
					"100%": {
						transform: "translateY(0px)",
						animationTimingFunction: "ease-in-out",
					},
				},
				refloat: {
					"0%": {
						transform: "translateY(-20px)",
						animationTimingFunction: "ease-in-out",
					},
					"50%": {
						transform: "translateY(0px)",
						animationTimingFunction: "ease-in-out",
					},
					"100%": {
						transform: "translateY(-20px)",
						animationTimingFunction: "ease-in-out",
					},
				},
				"gradient-x": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
				glow: {
					"0%": {
						filter: "blur(15px)",
						"background-position": "0% 50%",
					},
					"50%": {
						filter: "blur(5px)",
						"background-position": "200% 50%",
					},
					"100%": {
						filter: "blur(15px)",
						"background-position": "200% 50%",
					},
				},
				flip: {
					"100%": { transform: "perspective(1000px) rotateY(-180deg)" },
				},
			},
		},
	},
	plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
