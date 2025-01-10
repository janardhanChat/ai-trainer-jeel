/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
  			laptop: {
  				max: '1500px'
  			},
  			tab: {
  				max: '1180px'
  			},
  			mobile: {
  				max: '576px'
  			}
  		},
  		colors: {
  			black: '#000',
  			black100: '#19133A',
  			black200: '#272727',
  			blue: '#5138EE',
  			gray900: '#999',
  			borderColor: '#DADADA',
  			borderColor1: '#DFCBDE',
  			whiteOpacitybg: 'rgba(255, 255, 255, 0.10)',
  			whiteOpacitybg30: 'rgba(255, 255, 255, 0.30)',
  			whiteBorder: 'rgba(255, 255, 255, 0.60)',
  			modalbg: 'rgba(0, 0, 0, 0.7)',
  			blackOpacitybg: 'rgba(0, 0, 0, 0.8)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'30': '30px',
  			'50': '50px',
  			'60': '60px',
  			'80': '80px',
  			'100': '100px',
  			'110': '110px',
  			'120': '120px'
  		},
  		boxShadow: {
  			'md': ' 0px 4px 24px 0px rgba(0, 0, 0, 0.05)',
  			'lg': ' 0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
  			'lg2': ' 0px 4px 24px 0px rgba(0, 0, 0, 0.04)'
  		},
  		fontSize: {},
  		animation: {
  			opacityAnimation: 'opacity  .5s linear',
  			scroll: 'scrollY 60s linear infinite'
  		},
  		keyframes: {
  			rotateAnimation: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(1turn)'
  				}
  			},
  			scrollY: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(calc(-100% - 1rem))'
  				}
  			},
  			opacity: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			enterFromLeft: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-200px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			exitToRight: {
  				from: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateX(200px)'
  				}
  			},
  			exitToLeft: {
  				from: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'translateX(-200px)'
  				}
  			},
  			scaleIn: {
  				from: {
  					opacity: '0',
  					transform: 'rotateX(-10deg) scale(0.9)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'rotateX(0deg) scale(1)'
  				}
  			},
  			scaleOut: {
  				from: {
  					opacity: '1',
  					transform: 'rotateX(0deg) scale(1)'
  				},
  				to: {
  					opacity: '0',
  					transform: 'rotateX(-10deg) scale(0.95)'
  				}
  			},
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			}
  		},
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(264deg, #9E8FFC 0%, #6061FA 50%, #5EADFA 100%)',
  			'page-gradient': 'linear-gradient(180deg, #EFEFFD 0%, #F4E2EF 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}