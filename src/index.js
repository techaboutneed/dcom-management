// import Module files
import dataManage from './modules/Method.js'

// variable init
let urlText

// Get the page name
const urlpath = location.href

// Split the url in /
let urlsegments = urlpath.split('/')

// Loop the array of urlsegments
urlsegments.forEach((urlParts) => {
	// check the urls which include .html
	if (urlParts.includes('.html')) {
		// Split and Get the before part of .html
		urlParts = urlParts.split('.html')[0]

		// split the final text if - have in word then Get first Element
		urlText = urlParts.split('-')[0]
	}
})

// Get JSON Data Function
async function getJSONData(urlText) {
	try {
		// Generate full url path
		// let urlLocation = `https://cdn.jsdelivr.net/gh/techaboutneed/dcom-management@master/json/${urlText}.json`

		// Using fetch api get the JSON Data

		// const response = await fetch(urlLocation)
		// const datas = await response.json()

		const datas = await import(`./datas/${urlText}.js`).then(
			(data) => data.default
		)

		// iterate the object
		for (let data in datas) {
			// calling the commonClass with data of array and tableName
			dataManage(datas[data], data)
		}
	} catch (error) {
		console.log(error.message)

		// Declare the static table Names
		const tableNames = ['syllabus', 'note', 'paper']

		// iterate the object
		tableNames.forEach((tableName) =>
			// calling the commonClass with error message and tableName
			dataManage(
				`Check your connection properly and contact admin (aniloli42@gmail.com)`,
				tableName
			)
		)
	}
}

// calling getJSONData
getJSONData(urlText)
