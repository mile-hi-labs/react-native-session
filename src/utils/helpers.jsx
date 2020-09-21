import LodashArray from 'lodash/array';

export const addObject = (array, record) => {
	let newArray = !array.includes(record) ? array.push(record) : array;
	return array;
}

export const removeObject = (array, record) => {
	let newArray = LodashArray.pull(array, record);
	return newArray;
}

export const timeElapsed = (msg, start) => {
	if (process.env.NODE_ENV === 'development') {
  	return console.log(`${msg}: `, Date.now() - start + 'ms');
  }
}

export const logger = (...data) => {
	if (process.env.NODE_ENV === 'development') {
		return console.log(...data);
	}
}

export const isEmpty = (data) => {
	if (data === null || data === undefined || data === 'undefined') {
		return true
	}
	if (Array.isArray(data)) {
		return data.length === 0 ? true : false;
	}
	if (data.constructor === Object) {
	 return Object.keys(data) === 0 ? true : false;
	}
	return data.length === 0 ? true : false;
}