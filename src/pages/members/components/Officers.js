import React from "react"
import styled from "styled-components"

import Grid from "components/Grid"

import { dark } from "theme/Colors"
import { Heading as HeadingStyles } from "theme/Styles"
import { mobile, tablet, desktop } from "theme/Breakpoints"

import Officer from "./Officer"

const fixedHeight = "2.1875rem"

const data = [
	{
		name: "Srikar Gouru",
		position: "President",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Srikar Gouru; President",
		},
	},
	{
		name: "Ganesh Nanduru",
		position: "Vice President",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Ganesh Nanduru; Vice President",
		},
	},
	{
		name: "Niko Economos",
		position: "Secretary",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Niko Economos; Secretary",
		},
	},
	{
		name: "Liam West",
		position: "Treasurer",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Liam West; Treasurer",
		},
	},
	{
		name: "Jason Klein",
		position: "Webmaster",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Jason Klein; Webmaster",
		},
	},
	{
		name: "Daniel Stefanescu",
		position: "Publicist",
		image: {
			src: require("../assets/team.jpg"),
			alt: "Daniel Stefanescu; Publicist",
		},
	},
]

const Officers = () => (
	<Container as="section">
		<Heading>Officers</Heading>
		<Content />
	</Container>
)

export default Officers

const ThemedHeading = styled.h1(() => HeadingStyles)
const Heading = styled(ThemedHeading)`
	grid-area: heading;
`

const Container = styled(Grid)`
	height: 100%;
	--rows: unset;
	--columns: unset;
	grid-area: officers;
	background: ${dark};

	${mobile} {
		padding: 0 1rem;
	}

	${desktop} {
		padding: initial;
	}

	grid-template:
		"." ${fixedHeight}
		"heading" min-content
		"content" min-content
		"image" min-content
		"." ${fixedHeight};
`

const Content = () => (
	<ContentContainer>
		{data.map((officer, i) => (
			<Officer key={i} data={officer} />
		))}
	</ContentContainer>
)

const ContentContainer = styled.div`
	--numRows: ${props => props.children.length};
	grid-area: content;
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	${mobile} {
		grid-template-rows: repeat(var(--numRows), min-content);
	}

	${tablet} {
		grid-template-rows: repeat(calc(var(--numRows) / 2), min-content);
	}
`