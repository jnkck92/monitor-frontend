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
  address: string | null
  label: string
  color: string
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
}
