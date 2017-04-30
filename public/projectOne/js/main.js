var HRLab = new Backbone.Marionette.Application();

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
	model: User
});

var UserView = Backbone.Marionette.ItemView.extend({
	template: '#userView',
	tagName: 'li',
	className: 'listItem'

});

var NoUsersView = Backbone.Marionette.ItemView.extend({
	template: '#NoUsersView'
});

var UsersView = Backbone.Marionette.CollectionView.extend({
	childView: UserView,
	emptyView: NoUsersView,
	tagName: 'ul'
});

var FormView = Backbone.Marionette.ItemView.extend({
	template: '#formView',
	events: {
		'click button': 'createNewUser'
	},
	ui: {
		name: '#name',
		age: '#age'
	},

	createNewUser: function(){
		//create new user
		this.collection.add({
			name: this.ui.name.val(),
			age: this.ui.age.val(),
		});
		this.ui.name.val('');
		this.ui.age.val('');
	},
	removeUser: function(){
		//remove user
	}
});

HRLab.addRegions({
	form: '#form'

});

HRLab.addInitializer(function(){
	HRLab.users = new Users();
	HRLab.form.show(new FormView({collection: HRLab.users}));
	HRLab.list.show(new UsersView({collection: HRLab.users}));
});

HRLab.start()