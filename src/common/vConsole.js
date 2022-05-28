import VConsole from 'vconsole';

let vconsole = null;
if (process.env.NODE_ENV === 'production') {
	vconsole = new VConsole();
}

export default vconsole;
