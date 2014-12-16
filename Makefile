test:
	./node_modules/mocha/bin/mocha \
	--require test/setup \
	--require should \
	--reporter spec \
	--recursive \
	--check-leaks

test_all_unit:
	./node_modules/karma/bin/karma start

compile_js:
	java -jar bin/compiler.jar \
	'client/src/app/**.js' 'generated/template-cache.js' \
	'!**_test.js' 'client/closure-library/' \
	--angular_pass \
	--externs client/src/externs/**.js \
	--js_output_file public/javascripts/application.js \
	--generate_exports \
	--only_closure_dependencies \
	--closure_entry_point=norris.app \
	--compilation_level='ADVANCED_OPTIMIZATIONS' \
	--output_wrapper='(function(){%output%})();//# sourceMappingURL=application.js.map' \
	--create_source_map='./public/javascripts/application.js.map'

compile_js_debug:
	java -jar bin/compiler.jar \
	'client/src/app/**.js' 'generated/template-cache.js' \
	'!**_test.js' 'client/closure-library/' \
	--angular_pass \
	--externs client/src/externs/**.js \
	--js_output_file public/javascripts/application.js \
	--generate_exports \
	--only_closure_dependencies \
	--closure_entry_point=norris.app \
	--compilation_level='ADVANCED_OPTIMIZATIONS' \
	--output_wrapper='(function(){%output%})();//# sourceMappingURL=application.js.map' \
	--create_source_map='./public/javascripts/application.js.map' \
	--formatting PRETTY_PRINT

dependencies:
	node ./bin/template_cache && make compile_js

gjslint:
	gjslint \
	-r client/src/app \
	--closurized_namespaces='goog,norris' \
	--strict \
	--jslint_error=all

fixjsstyle:
	fixjsstyle -r src --strict --jslint_error=all --closurized_namespaces=norris

.PHONY: test test_all_unit compile_js compile_js_debug gjslint fixjsstyle
				dependencies
