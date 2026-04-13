/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
export default class AMIWebpackPlugin
{
	/*----------------------------------------------------------------------------------------------------------------*/

	// noinspection JSUnusedGlobalSymbols
	apply(compiler)
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* EXTERNALS                                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		if(typeof compiler.options.externals === 'undefined') {
			compiler.options.externals = {};
		}

		compiler.options.externals['ami'] = 'ami';

		compiler.options.externals['vue'] = ['ami', 'vue', 'Vue'];
		compiler.options.externals['vue/dist/vue.esm-bundler'] = ['ami', 'vue', 'Vue'];

		compiler.options.externals['bootstrap'] = ['ami', 'bootstrap', 'Bootstrap'];
		compiler.options.externals['bootstrap/dist/js/bootstrap.esm'] = ['ami', 'bootstrap', 'Bootstrap'];

		/*------------------------------------------------------------------------------------------------------------*/
		/* ALIASES                                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		if(typeof compiler.options.resolve.alias === 'undefined') {
			compiler.options.resolve.alias = {};
		}

		compiler.options.resolve.alias['ami'] = false;

		compiler.options.resolve.alias['vue'] = false;
		compiler.options.resolve.alias['vue/dist/vue.esm-bundler'] = false;

		compiler.options.resolve.alias['bootstrap'] = false;
		compiler.options.resolve.alias['bootstrap/dist/js/bootstrap.esm'] = false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
