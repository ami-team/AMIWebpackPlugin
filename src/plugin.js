/*--------------------------------------------------------------------------------------------------------------------*/

const { VueLoaderPlugin } = require('vue-loader');

/*--------------------------------------------------------------------------------------------------------------------*/

const BROWSER_LIST = [
	'defaults',
	'not ie 11',
	'not ie_mob 11'
];
/*--------------------------------------------------------------------------------------------------------------------*/

console.log(`Building for: ${BROWSER_LIST.join(', ')}`);

/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
module.exports = class AMIWebpackPlugin
{
	/*----------------------------------------------------------------------------------------------------------------*/

	constructor() {}

	/*----------------------------------------------------------------------------------------------------------------*/

	// noinspection JSUnusedGlobalSymbols
	apply(compiler)
	{
		if(typeof compiler.options === 'undefined') {
			compiler.options = {};
		}

		if(typeof compiler.options.module === 'undefined') {
			compiler.options.module = {};
		}

		if(typeof compiler.options.module.rules === 'undefined') {
			compiler.options.module.rules = [];
		}

		if(typeof compiler.options.externals === 'undefined') {
			compiler.options.externals = {};
		}

		if(typeof compiler.options.resolve.alias === 'undefined') {
			compiler.options.resolve.alias = {};
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* RULES                                                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		compiler.options.module.rules.push({
			test: /\\.vue$/,
			loader: 'vue-loader'
		});

		compiler.options.module.rules.push({
			'test': /\\.js$/,
			'use': {
				'loader': 'babel-loader',
				'options': {
					'shouldPrintComment': () => false,
					'plugins': [
						['@babel/plugin-transform-for-of', {
							'loose': true
						}]
					],
					'presets': [
						['@babel/preset-env', {
							'loose': true,
							'targets': BROWSER_LIST
						}]
					]
				}
			}
		});

		compiler.options.module.rules.push({
			'type': 'asset/source',
			'test': /\\.(twig|json|yml|xml)$/,
			'exclude': /node_modules/
		});

		compiler.options.module.rules.push({
			'type': 'asset/resource',
			'test': /\\.(gif|png|jpg|jpeg|svg|wasm)$/,
			'exclude': /node_modules/
		});

		compiler.options.module.rules.push({
			test: /\\.css$/,
			use: [
				'style-loader',
				'css-loader',
				{
					'loader': 'postcss-loader',
					'options': {
						'postcssOptions': {
							'plugins': [
								['autoprefixer', {}]
							]
						}
					}
				}
			]
		});

		/*------------------------------------------------------------------------------------------------------------*/

		new VueLoaderPlugin().apply(compiler);

		/*------------------------------------------------------------------------------------------------------------*/
		/* EXTERNALS                                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		compiler.options.externals['ami'] = 'ami';
		compiler.options.externals['jquery'] = 'jQuery';
		compiler.options.externals['moment'] = 'moment';
		compiler.options.externals['select2'] = 'select2';

		compiler.options.externals['vue'] = ['ami', 'vue', 'Vue'];
		compiler.options.externals['vue/dist/vue.esm-bundler'] = ['ami', 'vue', 'Vue'];

		compiler.options.externals['bootstrap'] = ['ami', 'bootstrap', 'Bootstrap'];
		compiler.options.externals['bootstrap/dist/js/bootstrap.esm'] = ['ami', 'bootstrap', 'Bootstrap'];

		/*------------------------------------------------------------------------------------------------------------*/
		/* ALIASES                                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		compiler.options.resolve.alias['ami'] = false;

		compiler.options.resolve.alias['vue'] = false;
		compiler.options.resolve.alias['vue/dist/vue.esm-bundler'] = false;

		compiler.options.resolve.alias['bootstrap'] = false;
		compiler.options.resolve.alias['bootstrap/dist/js/bootstrap.esm'] = false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
