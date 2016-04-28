
ko.bindingHandlers.gravatar = {
	update: function(element, valueAccessor, allBindings) {
		var email = valueAccessor(),
			isImage = (element.tagName === "IMG");

		// check email
		if (!email || !email.indexOf("@")) return;

		email = email.lowerCase().trim();

		require("md5", function(Crypto) {
			var gravatar = "//www.gravatar.com/avatar/" + Crypto.md5(email);

			if (isImage) {
				$(element).attr("src", gravatar);
			} else { // apply background image
				$(element).css("backgroundImage", "url('" + gravatar + "')");
			}
		});
	}
}
