test:
	./node_modules/mocha/bin/mocha \
	--require test/setup \
	--require should \
	--reporter spec \
	--recursive \
	--check-leaks

full_compile:
	python vendor/closure-library/closure/bin/build/closurebuilder.py \
	--root=vendor/closure-library/ --root=src --namespace="norris" \
	--output_mode=compiled --compiler_jar=closure-compiler/compiler.jar \
	> public/javascripts/application.js

quick_compile:
	java -jar closure-compiler/compiler.jar \
	'src/**.js' '!**_test.js' \
	--js_output_file public/javascripts/application.js

gjslint:
	gjslint --jslint_error=all --closurized_namespace --recurse src/

.PHONY: test full_compile quick_compile gjslint
