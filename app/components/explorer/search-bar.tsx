'use client'

const UNITS = [
  '100M','310ML','CENTO','CJ','DIA','H','JG','KG','KWH','L',
  'M','M/MES','M2','M2XMES','M3','MES','MIL','MXMES','PAR',
  'SC25KG','T','UN','UNXMES',
]

interface SearchBarProps {
  query: string
  unit: string
  limit: number
  onQueryChange: (q: string) => void
  onUnitChange: (unit: string) => void
  onLimitChange: (limit: number) => void
}

export function SearchBar({ query, unit, limit, onQueryChange, onUnitChange, onLimitChange }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar insumos... (ex: tubo pvc, cimento, vergalhão)"
        className="flex-1 min-w-0 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all"
        autoFocus
      />
      <select
        value={unit}
        onChange={(e) => onUnitChange(e.target.value)}
        className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 pr-10 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23666%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.646%205.646a.5.5%200%200%201%20.708%200L8%208.293l2.646-2.647a.5.5%200%200%201%20.708.708l-3%203a.5.5%200%200%201-.708%200l-3-3a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]"
      >
        <option value="">Todas unidades</option>
        {UNITS.map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>
      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 pr-10 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23666%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.646%205.646a.5.5%200%200%201%20.708%200L8%208.293l2.646-2.647a.5.5%200%200%201%20.708.708l-3%203a.5.5%200%200%201-.708%200l-3-3a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]"
      >
        <option value={25}>25 por pag.</option>
        <option value={50}>50 por pag.</option>
        <option value={100}>100 por pag.</option>
      </select>
    </div>
  )
}
