import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Button from "./Button"
import Grid from "./Grid"
import { dark, darker, text } from "theme/Colors"
import { Heading, Paragraph } from "theme/Styles"
import { mobile, tablet, desktop } from "theme/Breakpoints"

const Container = styled(Grid)`
	--rows: unset;

	background: ${darker};
	align-items: center;
	position: absolute;
	height: 5.375rem;
	z-index: 1;
	right: 0;
	left: 0;
	top: 0;

	${mobile} {
		--rows: 100% auto;
		--columns: 1rem repeat(10, 1fr) 1rem;
		gap: 0;

		/* prettier-ignore */
		grid-template-areas: 
			".       logo    logo    .       .       .       .       .       .       .       burger  .       "
			"content content content content content content content content content content content content ";
	}

	${tablet} {
		--columns: 0 repeat(8, 1fr) 0;
		column-gap: 1rem;

		/* prettier-ignore */
		grid-template-areas: 
			".        .       logo    logo    .       .       .       burger  .       .      "
			"content  content content content content content content content content content";
	}

	${desktop} {
		--columns: repeat(12, 1fr);

		/* prettier-ignore */
		grid-template-areas: 
			".       logo    logo    content content content content content content content content .       ";
	}
`

const LinksList = ({ hook, ...props }) => {
	const [active] = hook
	return <StyledLinksList active={active} {...props} />
}

const StyledLinksList = styled.ul`
	display: ${props => (props.active ? "initial" : "none")};
	justify-self: flex-end;
	list-style-type: none;
	width: 100%;

	background: ${dark};

	${desktop} {
		width: initial;
		background: ${darker};
		display: flex;

		li {
			&:not(:first-of-type) {
				margin-left: 1rem;
			}

			&:not(:last-of-type) {
				margin-right: 1rem;
			}
		}
	}
`

const LinkItem = styled.li.attrs(props => ({
	children: props.children,
	onClick: () => {
		props.hook[1](false)
	},
}))`
	justify-content: center;
	margin: 1rem auto;
	display: flex;
`

const StyledLink = styled(Link)`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`

const StyledBurger = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	display: grid;
	grid-template-rows: repeat(3, 3px);
	row-gap: 5px;
	grid-area: burger;

	${tablet} {
		justify-self: flex-end;
	}

	${desktop} {
		display: none;
	}
`

const Burger = ({ hook, ...props }) => {
	const [active, setActive] = hook

	return (
		<StyledBurger
			{...props}
			onClick={() => {
				setActive(!active)
			}}
		>
			<InnerBurger className="top" location="top" active={active} />
			<InnerBurger className="center" location="center" active={active} />
			<InnerBurger className="bottom" location="bottom" active={active} />
		</StyledBurger>
	)
}

const InnerBurger = styled.div`
	${props => {
		if (props.active)
			switch (props.location) {
				case "center":
					return "transform: scaleX(0);"
				case "top":
					return "transform: translateY(8px) rotate(45deg);"
				case "bottom":
					return "transform: translateY(-8px) rotate(-45deg);"
				default:
					return ""
			}
	}}

	width: 100%;
	height: 100%;
	background: ${text};
	transition: transform 0.2s ease;
	transform-origin: center;
`

const Header = () => {
	const [active, setActive] = useState(false)

	return (
		<Container active={active} as="header">
			<StyledLink to="/home" style={{ ...Heading, alignSelf: "initial", gridArea: "logo" }}>
				TJUAV
			</StyledLink>
			<Burger hook={[active, setActive]} />

			<LinksList hook={[active, setActive]} style={{ gridArea: "content" }}>
				<LinkItem hook={[active, setActive]}>
					<StyledLink to="/competition" style={Paragraph}>
						Competition
					</StyledLink>
				</LinkItem>
				<LinkItem hook={[active, setActive]}>
					<StyledLink to="/members" style={Paragraph}>
						Members
					</StyledLink>
				</LinkItem>
				<LinkItem hook={[active, setActive]}>
					<StyledLink to="/gallery" style={Paragraph}>
						Gallery
					</StyledLink>
				</LinkItem>
				<LinkItem hook={[active, setActive]}>
					<Button href="/home#sponsor">Sponsor</Button>
				</LinkItem>
			</LinksList>
		</Container>
	)
}

export default Header
