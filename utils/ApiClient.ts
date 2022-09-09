import axios from 'axios'

export interface CoordinateData {
	_id: 'string'
	color: {
		R: number
		G: number
		B: number
	}
	owner: string
	price: number
}

export default class ApiClient {
	static async fetchCoordinateData(x: number, y: number): Promise<CoordinateData> {
		const url = `https://us-east-1.aws.data.mongodb-api.com/app/dataapi-cmuqf/endpoint/canvas?key=${x}-${y}`
		return axios.get<CoordinateData[]>(url).then((res) => res.data[0])
	}
}