export function convertToSlug(text: string) {
	const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
	const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
	const p = new RegExp(a.split('').join('|'), 'g');
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(p, (c) => b.charAt(a.indexOf(c))) // substitui caracteres especiais
		.replace(/&/g, '-and-') // substitui & por '-and-'
		.replace(/[\s\W-]+/g, '-'); // substitui espacos, caracteres que n sao palavras e hifens por hifen unico
}
