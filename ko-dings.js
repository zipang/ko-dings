/**
 * A SET OF COOL MAPPINGS FOR KNOCKOUT.JS
 * @author zipang
 * @copyright 2014 - EIDOLON LABS
 */

(function() {

	if (!ko) {
		if (console) console.log("Knockout.JS not present.")
		return;
	}

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
			var dataBinds = $(element).data("bind").split(";");

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
			var newClass = valueAccessor()(),
				eltClassName = element.className;
			if (!eltClassName) {
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

})();
