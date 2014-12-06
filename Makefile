test:
	./node_modules/mocha/bin/mocha \
	--require test/setup \
	--require should \
	--reporter spec \
	--recursive \
	--check-leaks

compile_js:
	java -jar closure/compiler.jar \
	'src/app/**.js' '!**_test.js' 'vendor/closure-library/' \
	--angular_pass \
	--externs src/externs/**.js \
	--js_output_file public/javascripts/application.js \
	--only_closure_dependencies \
	--closure_entry_point=norris.app \
	--compilation_level='ADVANCED_OPTIMIZATIONS'

compile_js_debug:
	java -jar closure/compiler.jar \
	'src/app/**.js' '!**_test.js' 'vendor/closure-library/' \
	--angular_pass \
	--externs src/externs/**.js \
	--js_output_file public/javascripts/application.js \
	--only_closure_dependencies \
	--closure_entry_point=norris.app \
	--compilation_level='ADVANCED_OPTIMIZATIONS' \
	--formatting PRETTY_PRINT \
	--output_manifest manifest.MF

gjslint:
	gjslint \
	-r src/app \
	--closurized_namespaces='goog,norris.app' \
	--strict \
	--jslint_error=all

fixjsstyle:
	fixjsstyle -r src --strict --jslint_error=all --closurized_namespaces=norris

.PHONY: test compile_js compile_js_debug gjslint fixjsstyle genjsdeps
