'use client'

const ITEM_UNITS = [
  '100M','310ML','CENTO','CJ','DIA','H','JG','KG','KWH','L',
  'M','M/MES','M2','M2XMES','M3','MES','MIL','MXMES','PAR',
  'SC25KG','T','UN','UNXMES',
]

const COMPOSITION_UNITS = ['M', 'M2', 'M3', 'UN', 'KG', 'H', 'L', 'CJ']

const STATES = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
]

export type Mode = 'items' | 'compositions'

interface SearchBarProps {
  mode: Mode
  query: string
  unit: string
  state: string
  limit: number
  onModeChange: (mode: Mode) => void
  onQueryChange: (q: string) => void
  onUnitChange: (unit: string) => void
  onStateChange: (state: string) => void
  onLimitChange: (limit: number) => void
}

const selectClass =
  "w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 pr-10 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23666%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.646%205.646a.5.5%200%200%201%20.708%200L8%208.293l2.646-2.647a.5.5%200%200%201%20.708.708l-3%203a.5.5%200%200%201-.708%200l-3-3a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]"

export function SearchBar({
  mode, query, unit, state, limit,
  onModeChange, onQueryChange, onUnitChange, onStateChange, onLimitChange,
}: SearchBarProps) {
  const placeholder = mode === 'items'
    ? 'Buscar insumos... (ex: tubo pvc, cimento, vergalhão)'
    : 'Buscar composições... (ex: alvenaria, revestimento, contrapiso)'

  const units = mode === 'items' ? ITEM_UNITS : COMPOSITION_UNITS

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="inline-flex self-start bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => onModeChange('items')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            mode === 'items'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Insumos
        </button>
        <button
          type="button"
          onClick={() => onModeChange('compositions')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            mode === 'compositions'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Composições
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all"
          autoFocus
        />
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className={selectClass}
          aria-label="UF"
        >
          <option value="">Nacional</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className={selectClass}
          aria-label="Unidade"
        >
          <option value="">Todas unidades</option>
          {units.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className={selectClass}
          aria-label="Itens por página"
        >
          <option value={25}>25 por pag.</option>
          <option value={50}>50 por pag.</option>
          <option value={100}>100 por pag.</option>
        </select>
      </div>
    </div>
  )
}
