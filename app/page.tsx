import { Explorer } from '@/app/components/explorer/explorer'

export default function ExplorerPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <section aria-label="Apresentação do SINPRES" className="mb-6 text-center">
          <img
            src="/sinpres-logo-horizontal.svg"
            alt="SINPRES — Sistema Nacional de Preços Setoriais"
            className="h-36 mx-auto mb-4"
            width={400}
            height={144}
          />
          <h1 className="text-4xl font-semibold text-gray-900">
            Consulta de Preços e Insumos do SINAPI
          </h1>
          <p className="text-sm text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            O SINPRES (Sistema Nacional de Preços Setoriais) oferece acesso gratuito à base de dados
            do SINAPI, mantida pelo IBGE e pela Caixa Econômica Federal. Consulte preços de insumos,
            composições e serviços da construção civil brasileira. Ideal para engenheiros, arquitetos,
            orçamentistas e empresas de construção que precisam de referências de preços atualizadas.
          </p>
        </section>

        <Explorer />
      </div>
    </main>
  )
}
