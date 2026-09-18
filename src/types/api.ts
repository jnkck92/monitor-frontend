export interface Monitor {
  departmentName: string
  mode: string
  persons: Unit[]
  vehicles: Unit[]
  alarm: Alarm | null
  lastUpdate: string
  error: string | null
}

export interface Alarm {
  title: string
  keyword: string
  description: string | null
  address: string | null
  label: string
  color: string
  hint: string | null
  timestamp?: string
  lat?: number | null
  lon?: number | null
  weather?: Weather | null
  responses?: AlarmResponses | null
}

export interface RadioStatus {
  label: string
  color: string
}

export interface Unit {
  id: string
  name: string
  callSign: string
  alerted: boolean
  radioStatus: RadioStatus
  ownVehicle: boolean
  type?: 'person' | 'vehicle'
}

export interface Weather {
  tempC: number
  condition: string
  windKph: number
}

export interface AlarmResponses {
  coming: number
  notComing: number
  unknown: number
}

export interface NewsItem {
  id: number
  title: string
  description: string
  address: string | null
  timestamp: string
  survey: boolean
  answerable: boolean
}

export interface EventItem {
  id: number
  title: string
  description: string
  address: string | null
  timestamp: string
  participation: number
  answerable: boolean
}
