import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

import { IoNotificationsSharp } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { DiReact } from 'react-icons/di';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import logoImg from "../../assets/images/user_sample.jpg";
import userImg from "../../assets/images/user_sample.jpg";

export function SideBar() {
	const [sideBar, setSideBar] = useState(false);

	function handleChangeSideBar() {
		setSideBar((prevState) => !prevState);
	}
	return (
		<Container>
			<Content>
				{!sideBar ? (
					<ClosedSideBar>
						<nav>
							<button onClick={handleChangeSideBar}>
								<BsArrowRight />
							</button>

							<img src={logoImg} alt="Eu" />

							{/* Links principais do app */}
							<ul>
								<a href="/" title="Alguma coisa">
									<DiReact />
								</a>
								<a href="/" title="Alguma coisa">
									<DiReact />
								</a>
								<a href="/" title="Alguma coisa">
									<DiReact />
								</a>
								<a href="/" title="Alguma coisa">
									<DiReact />
								</a>
							</ul>
						</nav>
						<div>
							{/* Icones que pode não ser tão principais no app */}
							<ul>
								<a href="/" title="Notificações">
									<IoNotificationsSharp />
								</a>
								<a href="/" title="Configurações">
									<MdSettings />
								</a>
								<a href="/" title="Sair da conta">
									<RiLogoutCircleRLine />
								</a>
							</ul>

							<span>
								<img src={userImg} alt="Eu" />
							</span>
						</div>
					</ClosedSideBar>
				) : (
					<OpenSideBar>
						<section>
							<nav>
								<span>
									<button onClick={handleChangeSideBar}>
										<BsArrowLeft />
									</button>
								</span>
								<div>
									<img src={logoImg} alt="Eu" />
									<h1>Minha logo </h1>
								</div>

								{/* Icones principais do app */}
								<ul>
									<a href="/" title="Alguma coisa">
										<DiReact />
										<p>anything</p>
									</a>
									<a href="/" title="Alguma coisa">
										<DiReact />
										<p>anything</p>
									</a>
									<a href="/" title="Alguma coisa">
										<DiReact />
										<p>anything</p>
									</a>
									<a href="/" title="Alguma coisa">
										<DiReact />
										<p>anything</p>
									</a>
								</ul>
							</nav>
							<div>
								{/* Icones que pode não ser tão principais no app */}
								<ul>
									<a href="/">
										<IoNotificationsSharp />
										<p>Notifications</p>
									</a>
									<a href="/">
										<MdSettings />
										<p>Configurations</p>
									</a>
									<a href="/">
										<RiLogoutCircleRLine />
										<p> Exit </p>
									</a>
								</ul>

								<span>
									<img src={userImg} alt="Eu" />
									<p>Tiago Gonçalves de Castro</p>
								</span>
							</div>
						</section>
						<aside onClick={handleChangeSideBar} />
					</OpenSideBar>
				)}
			</Content>
		</Container>
	);
}
