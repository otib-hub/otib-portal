import { LinkType } from '@/@types/link';
import { InformativePageWrapper } from '@/components/layout/InformativePageWrapper';
import { Heading } from '@/components/ui/heading';
import { getTranslations } from 'next-intl/server';

export default async function PartnersPage() {
	const t = await getTranslations('');
	const breadcrumbs: LinkType[] = [
		{ title: t('meta.home.title'), url: '/otib' },
		{ title: t('meta.partners.title') },
	];

	return (
		<InformativePageWrapper breadcrumbLinks={breadcrumbs}>
			<main className="px-custom flex flex-col py-8 md:py-8 mb-10 md:mb-6 text-base md:text-lg space-y-6 lg:space-y-8">
				<Heading.H1>{t('meta.partners.title')}</Heading.H1>
				<p>
					Acreditamos que grandes resultados são alcançados quando
					trabalhamos juntos. Por isso, construímos uma rede de
					parceiros que compartilham dos mesmos valores: inovação,
					qualidade e compromisso com as pessoas.
				</p>
				<p>
					Com o apoio dos nossos parceiros, conseguimos ampliar nossa
					atuação, oferecer soluções mais completas e desenvolver
					ferramentas cada vez melhores dentro do portal.
				</p>

				<Heading.H2>Por que ser nosso parceiro?</Heading.H2>
				<ul>
					<li>
						Colaboração estratégica: desenvolvemos projetos em
						conjunto para potencializar oportunidades.
					</li>
					
					<li>
						Crescimento mútuo: valorizamos parcerias que geram
						benefícios reais para todos os envolvidos.
					</li>

					<li>
						Confiança e transparência: cada parceria é baseada em
						relações sólidas e duradouras.
					</li>
				</ul>

				<Heading.H2>Junte-se a nós</Heading.H2>
				<p>
					Se você acredita no poder da colaboração e deseja construir
					novas oportunidades de negócio, entre em contato com a nossa
					equipe. Estamos sempre abertos a novas conexões que possam
					transformar ideias em resultados.
				</p>
			</main>
		</InformativePageWrapper>
	);
}
