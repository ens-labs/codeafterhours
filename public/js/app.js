App = Ember.Application.create();

App.IndexController = Ember.ObjectController.extend({
	send: function() {
		alert("YOLO");
	}
});