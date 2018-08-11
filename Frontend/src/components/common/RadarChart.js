import React, {Component} from 'react'
import {ResponsiveContainer, Radar, RadarChart, Legend, PolarGrid, PolarAngleAxis} from 'recharts'

const RadarInstance = (props) => {

	const data = props.data.map((d, index) => {
		return { subject: d.variable.descripcion/*index + 1*/, A: d.puntosMaximos, B: d.puntosObtenidos }
	})

	return (
		<ResponsiveContainer width="100%" height={250}>
			<RadarChart
				outerRadius={100}
				width={700}
				height={400}
				data={data}
				margin={{top: 10, right: 2, bottom: -20, left: 2}}>
				<PolarGrid />
				<PolarAngleAxis dataKey="subject" tick={{fontSize: 11}} />
				<Radar
					name="Puntos máximos"
					dataKey="A"
					stroke="#323232"
					fill="#323232"
					fillOpacity={0.1} />
				<Radar
					name="Puntos obtenidos"
					dataKey="B"
					stroke="#94142e"
					fill="#94142e"
					fillOpacity={0.9} />
					<Legend />
					</RadarChart>
		</ResponsiveContainer>
	)
}

export default RadarInstance
