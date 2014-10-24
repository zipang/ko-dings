/**
 * ko-dings: A SET OF COOL MAPPINGS FOR KNOCKOUT.JS
 * @author zipang
 * @url https://github.com/zipang/ko-dings
 * @copyright 2014 - EIDOLON LABS
 */
(function() {

	if (!ko) {
		if (console) console.log("Knockout.JS not present.")
		return;
	}

	/**
	 * Extract a value from a property accessor that may be an observable or a simple property
	 */
	function decodeValue(accessor) {
		if (typeof accessor !== "function") return undefined;

		var firstVal = accessor();
		return (typeof firstVal === "function") ? firstVal() : firstVal;
	}

	// =============================================================
	// Wrap the default Knockout Binding Provider so that
	// binding errors don't throw exceptions anymore
	// =============================================================
	var koBindingProvider = ko.bindingProvider.instance;

	ko.bindingProvider.instance = {
		nodeHasBindings: koBindingProvider.nodeHasBindings,
		getBindings: function(node, bindingContext) {
			var bindings;
			try {
				bindings = koBindingProvider.getBindings(node, bindingContext);

			} catch (ex) {
				console.log("binding error", ex.message, node, bindingContext);
				$(node).data("error", {
					error: ex.message,
					context: bindingContext
				}).attr("title", ex.message).addClass("error");
			}

			return bindings;
		}
	};

	// =============================================================
	// Add new custom mappings for usual attributes href, src, etc..
	// =============================================================
	var bindingHandlers = ko.bindingHandlers;

	["href", "src", "alt", "title", "width", "height", "placeholder"].forEach(
		function def(_attr) {
			var binding = {}, attr = _attr;

			bindingHandlers[attr] = {
				update: function (element, valueAccessor) {
					bindingHandlers.attr.update(element, function () {
						binding[attr] = valueAccessor();
						return binding;
					});
				}
			};
		}
	);

	// =============================================================
	// Custom syntax for the class attribute.. class: status[draft|created|in_process]
	// =============================================================
	bindingHandlers["className"] = {
		init: function (element) {
			var dataBinds = $(element).data("bind").split(",");

			dataBinds.forEach(function(dataBind) {
				var definitionParts = dataBind.split(":"),
					key = definitionParts[0].trim(),
					bindExpr = definitionParts[1].trim();

				if (key === "className") {
					var bindingParts = bindExpr.match(/([\w-]+)/gi), // extract words in pattern attribute[class1|class2]
						accessorName = bindingParts.shift(),
						regex = new RegExp(bindingParts.join("|"), "gi");

					bindingParts.forEach(function(className) {
						$(element).data(className + "-update", regex);
					});
				}
			});
		},
		update: function (element, valueAccessor) {
			var newClass = decodeValue(valueAccessor),
				eltClassName = element.className;
			if (!newClass) {
				return;
			} else if (!eltClassName) {
				element.className = newClass;
			} else {
				element.className = eltClassName.replace($(element).data(newClass + "-update"), "")
								  + " " + newClass;
			}
		},
		preprocess: function(value, name, addBinding) {
			var bindingParts = value.match(/([\w-]+)/gi), // extract words in pattern attribute[class1|class2]
				accessorName = bindingParts.shift();

			return accessorName;
		}
	};

	/**
	 * Usage 1 :
	 * Toggle the class 'loading' according to the boolean value of the accessor of the same name
	 * <div data-bind="toggleClass: loading"></div>

	 * Usage 2 :
	 * Toggle the class 'loading' according to the boolean value of the accessor 'isLoading'
	 * <div data-bind="toggleClass: loading[isLoading]"></div>
	 */
	bindingHandlers["toggleClass"] = {
		init: function (element) {
			var dataBinds = $(element).data("bind").split(",");

			dataBinds.forEach(function(dataBind) {
				var definitionParts = dataBind.split(":"),
					key = definitionParts[0].trim(),
					bindExpr = definitionParts[1].trim();

				if (key === "toggleClass") {
					var bindingParts = bindExpr.match(/([\w-]+)/gi), // extract words in pattern className[accessor]
						accessorName = bindingParts.pop(),
						className = bindingParts.length ? bindingParts.pop() : accessorName;

					$(element).data("toggleClass", className);
				}
			});
		},
		update: function (element, valueAccessor) {
			var hasClass = decodeValue(valueAccessor),
				className = $(element).data("toggleClass");

			$(element).toggleClass(className, hasClass);
		},
		preprocess: function(value, name, addBinding) {
			var bindingParts = value.match(/([\w-]+)/gi), // extract words in pattern attribute[class1|class2]
				accessorName = bindingParts.pop();

			return accessorName;
		}
	};

})();
